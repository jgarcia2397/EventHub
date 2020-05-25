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
                    eventLeader={event.userId}
                    details={event.eventDetails}
                    delete={props.onDelete}
                    onCheckGuestsChat={props.onCheckGuestsOrChat}
                    isGuestEvent={props.isGuestList}
                    deleteError={props.deleteError}
                    isDeleteFail={event.id === props.deleteFailId} />
            ))}
        </div>
    );
}

export default eventList;