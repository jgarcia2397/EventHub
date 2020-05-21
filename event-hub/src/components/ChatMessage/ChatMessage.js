import React from 'react';

import classes from './ChatMessage.module.css';

const chatMessage = (props) => {
    let chatMsgClass = null;
    if (props.isYourMsg) {
        chatMsgClass = classes.YourChatMessage;
    } else {
        chatMsgClass = classes.OtherChatMessage;
    }

    return (
        <div className={chatMsgClass} key={props.timestamp}>
            <p><strong>{props.user}</strong></p>
            <p>{props.content}</p>
            <p>{props.timestamp}</p>
        </div>
    );
}

export default chatMessage;