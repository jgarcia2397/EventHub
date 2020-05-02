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

export const createEventStart = (eventDetails) => {
    return dispatch => {
        axios.post('/events.json', eventDetails)
            .then(response => {
                // this.props.history.push('/');
                dispatch(createEventSuccess(response.data, eventDetails));
            })
            .catch(error => {
                // console.log(error);
                dispatch(createEventFailed(error));
            });
    };
};