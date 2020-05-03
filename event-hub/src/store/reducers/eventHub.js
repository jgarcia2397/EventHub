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

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SELECT_MONTH: return selectMonth(state, action);
        case actionTypes.SELECT_YEAR: return selectYear(state, action);
        case actionTypes.TOGGLE_MONTH_SELECTOR: return toggleMonthSelector(state,action);
        case actionTypes.TOGGLE_YEAR_SELECTOR: return toggleYearSelector(state,action);
        case actionTypes.ON_PREV_CALENDAR_CLICK: return onPrevCalendarClick(state,action);
        case actionTypes.ON_NEXT_CALENDAR_CLICK: return onNextCalendarClick(state,action);
        case actionTypes.FETCH_EVENT_LIST_SUCCESS: return fetchEventListSuccess(state,action);
        case actionTypes.FETCH_EVENT_LIST_FAILED: return fetchEventListFail(state,action);
        default: return state;
    }
};

export default reducer;