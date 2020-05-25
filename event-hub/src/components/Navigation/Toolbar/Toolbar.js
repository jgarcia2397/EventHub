import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.EventHubTitle}><strong>EventHub</strong></div>
        <div>
            <NavigationItems 
                isAuth={props.auth}
                createEvent={props.onCreateEvent} />
        </div>
    </header>
);

export default toolbar;