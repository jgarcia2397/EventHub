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
            let updatedDateObject = Object.assign({}, state.dateObject);
            updatedDateObject = moment(updatedDateObject).set("month", monthNo); 
            
            return {
                ...state,
                dateObject: updatedDateObject,
                showMonthSelector: !state.showMonthSelector
            };
        case actionTypes.SELECT_YEAR:
            let updatedDateObject = Object.assign({}, state.dateObject);
            updatedDateObject = moment(updatedDateObject).set("year", year); 

            return {
                ...state,
                dateObject: updatedDateObject,
                showMonthSelector: !state.showMonthSelector
            };
        default:
            return state;
    }
};

export default reducer;