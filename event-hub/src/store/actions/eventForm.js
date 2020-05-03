import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

export const createEventSuccess = (id, eventDetails) => {
    return {
        type: actionTypes.CREATE_EVENT_SUCCESS,
        eventId: id,
        eventDetails: eventDetails
    };
};

export const createEventFailed = (error) => {
    return {
        type: actionTypes.CREATE_EVENT_FAILED,
        error: error
    };
};

export const createEventStart = () => {
    return {
        type: actionTypes.CREATE_EVENT_START
    };
};

export const createEvent = (eventDetails) => {
    return dispatch => {
        dispatch(createEventStart());
        axios.post('/events.json', eventDetails)
            .then(response => {
                // this.props.history.push('/');        // add this back in or fix using other method
                dispatch(createEventSuccess(response.data.name, eventDetails));
            })
            .catch(error => {
                // console.log(error);
                dispatch(createEventFailed(error));
            });
    };
};