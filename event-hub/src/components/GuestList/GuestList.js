import React from 'react';

import classes from './GuestList.module.css';

const guestList = (props) => {
    let guestList = null;
    guestList = (
        <div className={classes.GuestList}>
            <h3>Guest List</h3>
            <div className={classes.Guests}>
                <p>Josh</p>
                <p>Bob Belcher</p>
                <p>Captain Price</p>
            </div>
            <form className={classes.InviteForm}>
                <input onChange={props.inputChanged} value={props.val}></input>
                <button type="submit" onClick={props.onInvite}>Invite</button>
            </form>
        </div>
    );

    return (
        guestList
    );
};

export default guestList;