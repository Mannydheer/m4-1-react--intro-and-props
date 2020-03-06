import React from 'react';

function SentMessage(props) {

    return <div>
        {props.message}
        <img class='tipSent' src='/assets/tip-Received.svg'></img>
    </div>

}

export default SentMessage;


