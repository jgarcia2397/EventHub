import React from 'react';

import classes from './ChatMessage.module.css';

const chatMessage = (props) => {
    return (
        <p className={classes.ChatMessage} key={props.timestamp}>{props.content}</p>
    );
}

export default chatMessage;