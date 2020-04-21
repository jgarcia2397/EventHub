import React from 'react';

import classes from './EventList.module.css';
import Event from '../Event/Event';

const eventList = (props) => {
    return (
        <div className={classes.List}>
            {props.eventList.map(event => (
                <Event 
                    key={event.id}
                    details={event.eventDetails}
                    numGuests={event.numberOfGuests} />
            ))}
        </div>
    );
}

export default eventList;