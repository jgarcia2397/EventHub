import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <div className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Your EventHub</NavigationItem>
        <NavigationItem link="/createEventForm">Create Event</NavigationItem>
        <NavigationItem link="/chats" exact>Your Group Chats</NavigationItem>
        <NavigationItem link="/auth">Sign In/Out</NavigationItem>
    </div>
);

export default navigationItems;