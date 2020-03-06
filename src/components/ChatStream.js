import React from 'react';

import './ChatStream.css';

import ChatMessage from './ChatMessage'
// The current user's messages should have:
// - a text color of #FFF
// - a background color of #1185f7
//
// Other participant's messages should have:
// - a text color of #000
// - a background color of #e9e9eb

function ChatStream(props) {
  let allMessages = props.conversation.messages; //gives access to props.conversation
  console.log(allMessages)
  return <section className="chat-stream">{
    allMessages.map(msg => {
      let messageType;
      if(msg.user.username === props.currentUser.username) {
        messageType = 'sent';
      } 
      else {
        messageType = 'received';
      }
    
      return <ChatMessage messageType={messageType} message={msg.body} user={msg.user.username} theavatar={msg.user.avatar}  />
    })
  }</section>;
  // {
  //   allMessages.map(message => {
  //     return <ChatMessage message={message} />;
  //   });
  // }
}

export default ChatStream;
