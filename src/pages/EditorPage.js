import React, { useState } from 'react'
import Client from "../components/Client"
import Editor from '../components/Editor';
function EditorPage() {
  const [clients,setClients] = new useState([
    {socketId:1,username:"Aksh Patel"},
    {socketId:2,username:"Kano Patel"},
    {socketId:3,username:"Kalp Patel"}
  ]);
  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <div className='logo'>
            <img src='/code-sync.png' alt='unable to load img' className='logoImage'></img>
          </div>
          <h3>Connected</h3>
          <div className='clientsList'>
            {
              clients.map(client=>{
                return <Client key={client.socketId} username={client.username}></Client>
              })
            }
          </div>
        </div>
        <button className='btn copyBtn'>Copy ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className='editorWrap' >
        <Editor></Editor>
      </div>
    </div>
  )
}

export default EditorPage