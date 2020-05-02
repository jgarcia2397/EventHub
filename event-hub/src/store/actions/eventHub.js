import * as actionTypes from './actionTypes';

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