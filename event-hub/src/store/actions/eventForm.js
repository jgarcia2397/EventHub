import * as actionTypes from './actionTypes';
import axiosInstance from 'axios';
import axios from '../../axios-events';

export const createEventInit = (month, day, year) => {
    return {
        type: actionTypes.CREATE_EVENT_INIT,
        month: month,
        day: day,
        year: year
    };
};

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

export const createEvent = (eventDetails, token, userId) => {
    return dispatch => {
        dispatch(createEventStart());

        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const FIRST_URL = 'https://event-hub-195ae.firebaseio.com/' + '/events.json?auth=' + token;

        axiosInstance.post(PROXY_URL + FIRST_URL, eventDetails)
            .then(response => {
                // console.log(response.data.name);
                // dispatch(createEventSuccess(response.data.name, eventDetails));

                const queryParams = 'auth=' + token;

                // This is for adding event creator as initial member to members node of event
                axios.get('/users.json')
                    .then(res => {
                        let originalUser = null;
                        for (let key in res.data) {
                            if (userId === res.data[key].userId) {
                                originalUser = res.data[key];
                            }
                        }

                        const SECOND_URL = 'https://event-hub-195ae.firebaseio.com/' + response.data.name + '/members.json?' + queryParams;

                        axiosInstance.post(PROXY_URL + SECOND_URL, originalUser)
                            .then(res => {
                                // console.log(res);
                                dispatch(createEventSuccess(response.data.name, eventDetails));
                            })
                            .catch(err => {
                                dispatch(createEventFailed(err));
                            });
                    })
                    .catch(err => {
                        dispatch(createEventFailed(err));
                    });
            })
            .catch(error => {
                // console.log(error);
                dispatch(createEventFailed(error));
            });
    };
};