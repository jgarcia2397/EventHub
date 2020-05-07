import * as actionTypes from './actionTypes';
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

export const initEventList = (token) => {
    return dispatch => {
        dispatch(fetchEventListStart());
        axios.get('/events.json?auth=' + token + '&orderBy="eventTimestamp"')
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
                dispatch(fetchEventListSuccess(fetchedEvents));
            })
            .catch(err => {
                dispatch(fetchEventListFailed(err));
                console.log(err);
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

export const deleteEventFailed = (error) => {
    return {
        type: actionTypes.DELETE_EVENT_FAILED,
        error: error
    };
};

export const deleteEvent = (eventId) => {
    return dispatch => {
        dispatch(deleteEventStart());
        console.log(eventId);
        axios.delete('/events/' + eventId + '.json')
            .then(res => {
                dispatch(deleteEventSuccess(eventId));
            })
            .catch(err => {
                // console.log(err);
                dispatch(deleteEventFailed(err));
            });
    };
};