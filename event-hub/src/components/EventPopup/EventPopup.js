import React from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const createEventPopup = (props) => {
    let popupContent = null;

    if (props.isDeleting) {
        popupContent = (
            <Auxiliary>
                <h2>Delete Event</h2>
                <p>Are you sure you want to delete this event?</p>
                <button onClick={() => props.onDelete(props.deleteId)}>Delete</button>
                <button onClick={props.onCancel}>Cancel</button>
            </Auxiliary>
        );
    } else {
        popupContent = (
            <Auxiliary>
                <h2>Create New Event</h2>
                <p>You have selected <strong>{props.month} {props.day}, {props.year}</strong>. Would you like to create an event on this day?</p>
                <button onClick={props.onContinue}>Continue</button>
                <button onClick={props.onCancel}>Cancel</button>
            </Auxiliary>
        );
    }

    return (
        popupContent
    );
}

export default createEventPopup;