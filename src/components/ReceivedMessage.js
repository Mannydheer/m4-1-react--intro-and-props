import React from 'react';

function ReceivedMessage(props) {
 
    return <div>{props.message}
    <img class='tipReceived' src='/assets/tip-sent.svg'></img>
    </div>

    

}

export default ReceivedMessage;
