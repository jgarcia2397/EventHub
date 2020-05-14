import React from 'react';

import classes from './GuestList.module.css';

const guestList = (props) => {
    let guestList = null;
    guestList = (
        <div className={classes.GuestList}>
            <h3>Guest List</h3>
            <div className={classes.Guests}>
                {props.guests.map(guest => (
                    <p key={guest.id}>{guest.email.split("@")[0]}</p>
                ))}
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