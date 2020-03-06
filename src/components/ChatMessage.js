import React from 'react';

import './ChatMessage.css';
import SentMessage from './SentMessage'
import ReceivedMessage from './ReceivedMessage'



function ChatMessage(props) {
    
if (props.messageType === 'sent') {
    return  <div className="chat-message"> 
                    <div>
                        <img className="userImg" src={props.theavatar}/>
                    </div>
                <div className='userwithimage'>
                    <div className='userName'>
                        <span className='userName'>{props.user}</span>
                    </div>
                    <div className='msg'>
                        <SentMessage message={props.message}/>
                    </div>
                </div>     
            </div> ;
          } 
        else {
     return <div className="georgechat-message"> 
                <div className='userwithimage'>
                    <div className='userName'>
                        <span className='userName'>{props.user}</span>
                    </div>
                    <div className='msgGeorge'>
                        <ReceivedMessage message={props.message}/>
                    </div>
                </div>  
                <div>
                    <img className="georgeImg" src={props.theavatar}/>
                </div>
            </div> 
     
          }
        

}

export default ChatMessage;