import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <div className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Your EventHub</NavigationItem>
        <NavigationItem link="/createEventForm">Create Event</NavigationItem>
        { props.isAuth 
            ? <NavigationItem link="/chats" exact>Your Group Chats</NavigationItem>
            : null
        }
        { props.isAuth 
            ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Login</NavigationItem>
        }
    </div>
);

export default navigationItems;