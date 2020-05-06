import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    events: [],
    loading: false,      // to be used later when Spinner is added
    eventCreated: false,
    creatingEvent: false
}

const createEventInit = (state, action) => {
    return updateObject(state, {eventCreated: false, creatingEvent: true});
};

const createEventStart = (state, action) => {
    return updateObject(state, {loading: true, creatingEvent: false});
};

const createEventSuccess = (state, action) => {
    const newEvent = updateObject(action.eventDetails, {id: action.eventId});
    const updatedObject = {
        loading: false,
        eventCreated: true,
        creatingEvent: false,
        events: state.events.concat(newEvent)
    };
    return updateObject(state, updatedObject);
};

const createEventFailed = (state, action) => {
    return updateObject(state, {loading: false, creatingEvent: false});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_EVENT_INIT: return createEventInit(state, action);     
        case actionTypes.CREATE_EVENT_START: return createEventStart(state, action);    
        case actionTypes.CREATE_EVENT_SUCCESS: return createEventSuccess(state, action);  
        case actionTypes.CREATE_EVENT_FAILED: return createEventFailed(state, action);    
        default: return state;
    }
};

export default reducer;