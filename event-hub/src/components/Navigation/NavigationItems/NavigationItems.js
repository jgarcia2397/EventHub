import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <div className={classes.NavigationItems}>
        <h3>Create Event</h3>
        <h3>|</h3>
        <h3>Your Events</h3>
        <h3>|</h3>
        <h3>Sign In/Out</h3>
    </div>
);

export default navigationItems;