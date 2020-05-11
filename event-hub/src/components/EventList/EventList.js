import React from 'react';

import classes from './EventList.module.css';
import Event from '../Event/Event';

const eventList = (props) => {
    let eventArray = Array.from(props.eventList);
    return (
        <div className={classes.List}>
            {eventArray.map(event => (
                <Event 
                    key={event.id}
                    eventId={event.id}
                    details={event.eventDetails}
                    numGuests={event.numberOfGuests}
                    delete={props.onDelete}
                    onCheckGuestsChat={props.onCheckGuestsOrChat} />
            ))}
        </div>
    );
}

export default eventList;