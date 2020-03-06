import React from "react";

import "./Header.css";
import HeaderImages from './headerImages'


function Header(props) {
  let headerParticipants = props.participants;
  return <header>{
    headerParticipants.map(participant => {
      let imageParticipant
      if(participant.username !== 'Elaine') {
          imageParticipant = participant.avatar;
          return <HeaderImages imageParticipant={imageParticipant}/>
      }
     
    })
    
    
    
    }</header>;
}

export default Header;
