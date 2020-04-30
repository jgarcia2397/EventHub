import moment from 'moment';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    dateObject: moment(),
    showMonthSelector: false,
    showYearSelector: false
};

const reducer = (state = initialState, action) => {

};

export default reducer;