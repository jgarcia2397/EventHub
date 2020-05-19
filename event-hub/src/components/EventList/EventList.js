import React from 'react';

import classes from './EventList.module.css';
import Event from '../Event/Event';

const eventList = (props) => {
    let listClassName = classes.List;
    if (props.isGuestList) {
        listClassName = classes.GuestList;
    }

    let eventArray = Array.from(props.eventList);

    return (
        <div className={listClassName}>
            {eventArray.map(event => (
                <Event 
                    key={event.id}
                    eventId={event.id}
                    details={event.eventDetails}
                    numGuests={event.numberOfGuests}
                    delete={props.onDelete}
                    onCheckGuestsChat={props.onCheckGuestsOrChat}
                    isGuestEvent={props.isGuestList} />
            ))}
        </div>
    );
}

export default eventList;