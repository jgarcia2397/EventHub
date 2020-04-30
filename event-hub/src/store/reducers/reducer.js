import moment from 'moment';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    dateObject: moment(),
    monthList: moment.months(),
    showMonthSelector: false,
    showYearSelector: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SELECT_MONTH:
            let monthNo = state.monthList.indexOf(action.monthName); 
            let updatedDateObjectMonth = Object.assign({}, state.dateObject);
            updatedDateObjectMonth = moment(updatedDateObjectMonth).set("month", monthNo); 
            
            return {
                ...state,
                dateObject: updatedDateObjectMonth,
                showMonthSelector: !state.showMonthSelector
            };
        case actionTypes.SELECT_YEAR:
            let updatedDateObjectYear = Object.assign({}, state.dateObject);
            updatedDateObjectYear = moment(updatedDateObjectYear).set("year", action.year); 

            return {
                ...state,
                dateObject: updatedDateObjectYear,
                showYearSelector: !state.showYearSelector
            };
        case actionTypes.TOGGLE_MONTH_SELECTOR:
            return {
                ...state,
                showMonthSelector: !state.showMonthSelector
            };
        case actionTypes.TOGGLE_YEAR_SELECTOR:
            return {
                ...state,
                showYearSelector: !state.showYearSelector
            };
        default:
            return state;
    }
};

export default reducer;