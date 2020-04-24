import React from 'react';

import classes from './Event.module.css';

const event = (props) => {
    // const eventDetails = [];

    // for (let detail in props.details) {
    //     eventDetails.push({
    //         detailName: detail,
    //         detailValue: props.details[detail]
    //     });
    // }

    return (
        <div className={classes.Event}>
            <div className={classes.Text}>
                <p><strong>{props.details.month} {props.details.day}, {props.details.year}</strong></p>
                <p><strong>{props.details.name}</strong> @ {props.details.place}</p>
                <p><strong>Starts at </strong>{props.details.startHour}:{props.details.startMinute} {props.details.startPeriod}</p>
                <p><strong>Ends at </strong>{props.details.endHour}:{props.details.endMinute} {props.details.endPeriod}</p>
                <p>You have invited {props.numGuests} guests</p>
            </div>
            <div className={classes.ButtonSide}>
                <button>See Guest List</button>
                <button onClick={() => props.delete(props.eventId)}>Delete Event</button>
            </div>
        </div>
    );
}

export default event;