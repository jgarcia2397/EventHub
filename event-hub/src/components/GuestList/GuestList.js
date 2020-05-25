import React from 'react';

import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './GuestList.module.css';

const guestList = (props) => {
    let inviteWarningMsg = null;
    if (props.guestAlreadyInvited) {
        inviteWarningMsg = <p className={classes.WarningMessage}>This guest was already invited!</p>;
    } else if (props.guestNotExists) {
        inviteWarningMsg = <p className={classes.WarningMessage}>The invited guest has not registered for an account!</p>;
    }

    let inviteGuestForm = null;
    if (props.isLeader && props.inviteLoading) {
        inviteGuestForm = <Spinner />;
    } else if (props.isLeader && !props.inviteLoading) {
            inviteGuestForm = (
                <form className={classes.InviteForm}>
                    <input onChange={props.inputChanged} value={props.invitedGuest}></input>
                    <button type="submit" disabled={props.invitedGuest === ''} onClick={props.onInvite}>Invite</button>
                    {inviteWarningMsg}
                </form>
            );
    }

    let guests = <Spinner />;
    if (!props.membersLoading) {
        guests = (
            props.guests.map(guest => (
                <p key={guest.id}>{guest.email.split("@")[0]}</p>
            ))
        );
    }

    let guestList = null;
    guestList = (
        <div className={classes.GuestList}>
            <h3>Guest List</h3>
            <div className={classes.Guests}>
                {guests}
            </div>
            <div>
                {inviteGuestForm}
            </div>
        </div>
    );

    return (
        guestList
    );
};

export default guestList;