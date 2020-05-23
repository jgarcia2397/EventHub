import * as actionTypes from './actionTypes';
import axiosInstance from 'axios';
import axios from '../../axios-events';
import moment from 'moment';

export const selectMonth = (month) => {
    return {
        type: actionTypes.SELECT_MONTH, 
        monthName: month
    };
};

export const selectYear = (year) => {
    return {
        type: actionTypes.SELECT_YEAR, 
        year: year
    };
};

export const toggleMonthSelector = () => {
    return {
        type: actionTypes.TOGGLE_MONTH_SELECTOR
    };
};

export const toggleYearSelector = () => {
    return {
        type: actionTypes.TOGGLE_YEAR_SELECTOR
    };
};

export const onPrevCalendarClick = () => {
    return {
        type: actionTypes.ON_PREV_CALENDAR_CLICK
    };
};

export const onNextCalendarClick = () => {
    return {
        type: actionTypes.ON_NEXT_CALENDAR_CLICK
    };
};

export const fetchEventListStart = (events) => {
    return {
        type: actionTypes.FETCH_EVENT_LIST_START
    };
};

export const fetchEventListSuccess = (events) => {
    return {
        type: actionTypes.FETCH_EVENT_LIST_SUCCESS,
        events: events
    };
};

export const fetchEventListFailed = (error) => {
    return {
        type: actionTypes.FETCH_EVENT_LIST_FAILED,
        error: error
    };
};

export const initEventList = (token, userId) => {
    return dispatch => {
        dispatch(fetchEventListStart());

        // this will only get events created by a specific user, will need to add functionality to get event if you did not create event, but you are invited by creator
        const queryParams = 'auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        // axios.get('/events.json?auth=' + token + '&orderBy="eventTimestamp"')
        axios.get('/events.json?' + queryParams)
            .then(res => {
                const fetchedEvents = [];
                for (let key in res.data) {
                    fetchedEvents.push({
                        ...res.data[key],
                        id: key
                    });
                }
                fetchedEvents.sort((a, b) => {
                    if (moment(b.eventTimestamp).isBefore(a.eventTimestamp)){
                        return 1;
                    } else if (moment(a.eventTimestamp).isBefore(b.eventTimestamp)){
                        return -1;
                    } else {
                        return 0;
                    }
                });
                //console.log(res);
                dispatch(fetchEventListSuccess(fetchedEvents));
            })
            .catch(err => {
                dispatch(fetchEventListFailed(err));
                //console.log(err);
            });
    };
};

export const fetchGuestEventListStart = () => {
    return {
        type: actionTypes.FETCH_GUEST_EVENT_LIST_START
    };
};

export const fetchGuestEventListSuccess = (guestEvents) => {
    return {
        type: actionTypes.FETCH_GUEST_EVENT_LIST_SUCCESS,
        guestEvents: guestEvents
    };
};

export const fetchGuestEventListFailed = (error) => {
    return {
        type: actionTypes.FETCH_GUEST_EVENT_LIST_FAILED,
        error: error
    };
};

export const initGuestEventList = (token, userId) => {
    return dispatch => {
        dispatch(fetchGuestEventListStart());

        const queryParams = 'auth=' + token;

        axios.get('/events.json?' + queryParams)
            .then(res => {
                const fetchedGuestEvents = [];
                for (let key in res.data) {
                    if (userId !== res.data[key].userId) {
                        for (let keyTwo in res.data[key].members) {
                            if (userId === res.data[key].members[keyTwo].userId) {
                                fetchedGuestEvents.push({
                                    ...res.data[key],
                                    id: key
                                });
                            }
                        }
                    }
                }
                //console.log(res);
                dispatch(fetchGuestEventListSuccess(fetchedGuestEvents));
            })
            .catch(err => {
                dispatch(fetchGuestEventListFailed(err));
                //console.log(err);
            });
    };
};

export const deleteEventStart = () => {
    return {
        type: actionTypes.DELETE_EVENT_START
    };
};

export const deleteEventSuccess = (id) => {
    return {
        type: actionTypes.DELETE_EVENT_SUCCESS,
        eventId: id
    };
};

export const deleteEventFailed = (id, error) => {
    return {
        type: actionTypes.DELETE_EVENT_FAILED,
        eventId: id,
        error: error
    };
};

export const deleteEvent = (eventId, token) => {
    return dispatch => {
        dispatch(deleteEventStart());
        console.log(eventId);

        const queryParams = 'auth=' + token;

        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const URL = 'https://event-hub-195ae.firebaseio.com/' + '/events/' + eventId + '.jso?' + queryParams;

        axiosInstance.delete(PROXY_URL + URL)
            .then(res => {
                dispatch(deleteEventSuccess(eventId));
            })
            .catch(err => {
                dispatch(deleteEventFailed(eventId, err));
            });
    };
};