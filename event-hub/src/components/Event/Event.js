import React from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Event.module.css';

const event = (props) => {
    let modifyEventButtons = null;
    let buttonClass = classes.GuestButtonSide;
    let eventClass = classes.GuestEvent;

    if (!props.isGuestEvent) {
        modifyEventButtons = (
            <Auxiliary>
                <button>Update Event</button>
                <button onClick={() => props.delete(props.eventId)}>Delete Event</button>
            </Auxiliary>
        );
        buttonClass = classes.ButtonSide;
        eventClass = classes.Event;
    }

    return (
        <div className={eventClass}>
            <div className={classes.Text}>
                <p><strong>{props.details.month} {props.details.day}, {props.details.year}</strong></p>
                <p><strong>{props.details.name}</strong> @ {props.details.place}</p>
                <p><strong>Starts at </strong>{props.details.startHour}:{props.details.startMinute} {props.details.startPeriod}</p>
                <p><strong>Ends at </strong>{props.details.endHour}:{props.details.endMinute} {props.details.endPeriod}</p>
                <p>You have invited {props.numGuests} guests</p>
            </div>
            <div className={buttonClass}>
                <button 
                    onClick={() => {
                        props.onCheckGuestsChat(
                            props.eventId, 
                            props.details.name, 
                            props.details.month + " " + props.details.day + ", " + props.details.year
                        )
                    }}>
                        Guest List/Chat
                </button>
                {modifyEventButtons}
            </div>
        </div>
    );
}

export default event;