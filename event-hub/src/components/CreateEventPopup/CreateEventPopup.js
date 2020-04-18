import React from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const createEventPopup = (props) => {
    return (
        <Auxiliary>
            <h2>Create New Event</h2>
            <p>You have selected <strong>{props.month} {props.day}, {props.year}</strong>. Would you like to create an event on this day?</p>
            <button onClick={props.onContinue}>Continue</button>
            <button onClick={props.onCancel}>Cancel</button>
        </Auxiliary>
    );
}

export default createEventPopup;