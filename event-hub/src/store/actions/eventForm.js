import * as actionTypes from './actionTypes';
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

export const createEvent = (eventDetails, token) => {
    return dispatch => {
        dispatch(createEventStart());
        axios.post('/events.json?auth=' + token, eventDetails)
            .then(response => {
                // console.log(response.data.name);
                dispatch(createEventSuccess(response.data.name, eventDetails));

                const accountLookup = {
                    idToken: token
                };
                const queryParams = 'auth=' + token;

                // This is for adding event creator as initial member to members node of event
                axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCMiumycDHNEhxQSSL7DtlXTQioeLYKKJc', accountLookup)
                .then(res => {
                    // console.log(res);
                    axios.post('/events/' + response.data.name + '/members.json?' + queryParams, res.data.users)
                        .then(res => {
                            console.log(res);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(error => {
                // console.log(error);
                dispatch(createEventFailed(error));
            });
    };
};