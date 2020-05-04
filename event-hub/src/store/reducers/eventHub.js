import moment from 'moment';

import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    dateObject: moment(),
    monthList: moment.months(),
    showMonthSelector: false,
    showYearSelector: false,
    events: [],
    error: false
};

const selectMonth = (state, action) => {
    let monthNo = state.monthList.indexOf(action.monthName); 
    let updatedDateObjectMonth = Object.assign({}, state.dateObject);
    updatedDateObjectMonth = moment(updatedDateObjectMonth).set("month", monthNo); 

    const updatedStateSelMonth = {
        dateObject: updatedDateObjectMonth,
        showMonthSelector: !state.showMonthSelector
    }
    return updateObject(state, updatedStateSelMonth);
};

const selectYear = (state, action) => {
    let updatedDateObjectYear = Object.assign({}, state.dateObject);
    updatedDateObjectYear = moment(updatedDateObjectYear).set("year", action.year); 

    const updatedStateSelYear = {
        dateObject: updatedDateObjectYear,
        showYearSelector: !state.showYearSelector
    }
    return updateObject(state, updatedStateSelYear);
};

const toggleMonthSelector = (state, action) => {
    const updatedStateTogMonth = {
        showMonthSelector: !state.showMonthSelector
    }
    return updateObject(state, updatedStateTogMonth);
};

const toggleYearSelector = (state, action) => {
    const updatedStateTogYear = {
        showYearSelector: !state.showYearSelector
    }
    return updateObject(state, updatedStateTogYear);
};

const onPrevCalendarClick = (state, action) => {
    let curr = "";
    if (state.showYearSelector) {
        curr = "year";
    } else {
        curr = "month";
    }

    let updatedDateObjectPrev = Object.assign({}, state.dateObject);
    updatedDateObjectPrev = moment(updatedDateObjectPrev).subtract(1, curr);

    const updatedStatePrevClick = {
        dateObject: updatedDateObjectPrev
    }
    return updateObject(state, updatedStatePrevClick);
};

const onNextCalendarClick = (state, action) => {
    let curr = "";
    if (state.showYearSelector) {
        curr = "year";
    } else {
        curr = "month";
    }

    let updatedDateObjectNext = Object.assign({}, state.dateObject);
    updatedDateObjectNext = moment(updatedDateObjectNext).add(1, curr);
    
    const updatedStateNextClick = {
        dateObject: updatedDateObjectNext
    }
    return updateObject(state, updatedStateNextClick);
};

const fetchEventListStart = (state, action) => {
    const updatedStateFetchStart = state;
    return updateObject(state, updatedStateFetchStart);
};

const fetchEventListSuccess = (state, action) => {
    const updatedStateFetchSuccess = {
        events: action.events
    }
    return updateObject(state, updatedStateFetchSuccess);
};

const fetchEventListFail = (state, action) => {
    const updatedStateFetchFail = state;
    return updateObject(state, updatedStateFetchFail);
};

const deleteEventStart = (state, action) => {
    const updatedStateDeleteStart = state;
    return updateObject(state, updatedStateDeleteStart);
};

const deleteEventSuccess = (state, action) => {
    const eventsCopy = [...state.events];
    const deletedEvent = eventsCopy.splice(eventsCopy.findIndex(events => events.key == action.eventId));
    const updatedEvents = updateObject(state.events, deletedEvent);
    const updatedStateDeleteSuccess = {
        events: updatedEvents
    };
    return updateObject(state, updatedStateDeleteSuccess);
};

const deleteEventFail = (state, action) => {
    const updatedStateDeleteFail = state;
    return updateObject(state, updatedStateDeleteFail);
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SELECT_MONTH: return selectMonth(state, action);
        case actionTypes.SELECT_YEAR: return selectYear(state, action);
        case actionTypes.TOGGLE_MONTH_SELECTOR: return toggleMonthSelector(state,action);
        case actionTypes.TOGGLE_YEAR_SELECTOR: return toggleYearSelector(state,action);
        case actionTypes.ON_PREV_CALENDAR_CLICK: return onPrevCalendarClick(state,action);
        case actionTypes.ON_NEXT_CALENDAR_CLICK: return onNextCalendarClick(state,action);
        case actionTypes.FETCH_EVENT_LIST_START: return fetchEventListStart(state,action);
        case actionTypes.FETCH_EVENT_LIST_SUCCESS: return fetchEventListSuccess(state,action);
        case actionTypes.FETCH_EVENT_LIST_FAILED: return fetchEventListFail(state,action);
        case actionTypes.DELETE_EVENT_START: return deleteEventStart(state, action);    
        case actionTypes.DELETE_EVENT_SUCCESS: return deleteEventSuccess(state, action);  
        case actionTypes.DELETE_EVENT_FAILED: return deleteEventFail(state, action); 
        default: return state;
    }
};

export default reducer;