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
            <p className={classes.UsernameField}><strong>{props.user}</strong></p>
            <p className={classes.ContentField}>{props.content}</p>
            <p className={classes.DateField}>{props.timestamp}</p>
        </div>
    );
}

export default chatMessage;