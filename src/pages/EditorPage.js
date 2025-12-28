import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Client from "../components/Client"
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation,useParams,useNavigate,Navigate} from 'react-router-dom';
// Navigate is conditional used when data is missing / login is remaining than redirect to home page

// use navigate is used to pass data/state bw 2 pages and receiver read data/state using uselocation hook
//  (data passing is optional by the way)
function EditorPage() {
    const socketRef = useRef(null)
    const codeRef = useRef(null)
    const location = useLocation()//related to state(to read passed data bw routes)
    const { roomId } = useParams();//to get dynamic parameters from url
    const reactNavigator = useNavigate();

    function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
    }
    useEffect(()=>{
        const init = async ()=>{
            socketRef.current = await initSocket();//creates socket
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            // on geeting above succesfully socket-->trigger/send join event with some data to server
            socketRef.current.emit(ACTIONS.JOIN,{
                roomId,
                username : location.state?.username
            })

            //listening for joined event (come from backend)
            //                      for sending notification to all except new one
            //                      displaying list of member of room  at left 
            socketRef.current.on(ACTIONS.JOINED,({clients,username,socketId})=>{
                if(username!==location.state?.username){   //do not send notification to new user
                    toast.success(`${username} joined the room.`)
                    console.log(`${username} joined`)
                }
                setClients(clients)
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
            })

            // listening for disconnected event(come from backend)
            //                      for sending notification to all connected users\
            //                      updating list of connected users in room
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );

           
        }
        init()
        return () => {//runs on unmounting of compo  (turnning of event listner)
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        };
    },[]);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    const [clients,setClients] = useState([]);

    if(!location.state)return <Navigate to="/"/>
  return (
    <div className='mainWrap'>
        <div className='aside'>
            <div className='asideInner'>
                <div className='logo'>
                    <img className='logoImage' src='/code-sync.png' alt='unable to load logo'></img>
                </div>
                <h3>Connected</h3>
                <div className='clientsList'>
                    {
                        clients.map(client=>{
                            return <Client key={client.socketId} username={client.username}/>
                        })
                    }
                </div>
            </div>
            <button className='btn copyBtn' onClick={copyRoomId}>Copy ROOM ID</button>
            <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
        </div>
        <div className='editor wrap'>
            <Editor 
                socketRef={socketRef} 
                roomId={roomId} 
                onCodeChange={ (code)=>{
                    codeRef.current=code
                }}
            />
        </div>
    </div>
  )
}

export default EditorPage