import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    let navLink = null;
    if (props.eventCreator) {
        navLink = <NavLink
                onClick={() => props.onCreate()}
                to={props.link}
                exact={props.exact}
                activeClassName={classes.active}>{props.children}</NavLink>
    } else {
        navLink = <NavLink
                to={props.link}
                exact={props.exact}
                activeClassName={classes.active}>{props.children}</NavLink>
    }
    return (
        <li className={classes.NavigationItem}>
            {navLink}
        </li>
    );
}

export default navigationItem;