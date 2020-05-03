import * as actionTypes from '../actions/actionTypes';

const initialState = {
    events: [],
    loading: false,      // to be used later when Spinner is added
    eventCreated: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_EVENT_INIT:
            return {
                ...state,
                eventCreated: false
            };
        case actionTypes.CREATE_EVENT_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.CREATE_EVENT_SUCCESS:
            const newEvent = {
                ...action.eventDetails,
                id: action.eventId
            };
            return {
                ...state,
                loading: false,
                eventCreated: true,
                events: state.events.concat(newEvent)
            };
        case actionTypes.CREATE_EVENT_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;