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
        <p className={chatMsgClass} key={props.timestamp}>{props.content}</p>
    );
}

export default chatMessage;