import React, { useEffect, useRef } from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

function Editor({socketRef,roomId,onCodeChange}) {
    const editorRef = useRef(null)
    useEffect(()=>{
        async function  init() {
            
            editorRef.current = CodeMirror.fromTextArea(document.getElementById("realtimeEditor"),{
                //this options are optional
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            })  
            // listen change event on editor at front end
            editorRef.current.on('change',(instance,changes)=>{
                // console.log('changes',changes)
                const {origin} =changes
                const code = instance.getValue()
                
                onCodeChange(code)
                if(origin!=='setValue'){ // tell server that text in editor changed
                    socketRef.current.emit(ACTIONS.CODE_CHANGE,{
                         roomId,
                         code,
                    })
                }
            })
            
            // editorRef.current.setValue('This is Real Time Code editor of AKSH PATEL 😃')//this text will be seen by default initially
        }
        init()
    },[])

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }

        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);

    return (
       <textarea id='realtimeEditor'></textarea>
    )
}

export default Editor