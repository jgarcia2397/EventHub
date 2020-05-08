import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    chats: [],
    content: '',
    chatsLoading: false,
    singleMsgLoading: false,
    readError: null,
    writeError: null
};

export const chatInputChanged = (state, action) => {
    return updateObject(state, {content: action.content});
};

export const sendMsgStart = (state, action) => {
    return updateObject(state, {singleMsgLoading: true});
};

export const sendMsgSuccess = (state, action) => {
    const newMsgDetails = updateObject(action.msgDetails, {id: action.msgId});
    const updatedMsgObject = {
        content: '',
        singleMsgLoading: false,
        writeError: null,
        chats: state.chats.concat(newMsgDetails)
    };

    return updateObject(state, updatedMsgObject);
};

export const sendMsgFailed = (state, action) => {
    return updateObject(state, {writeError: action.error, singleMsgLoading: false});
};

export const fetchChatsStart = (state, action) => {
    return updateObject(state, {chatsLoading: true});
};

export const fetchChatsSuccess = (state, action) => {
    const updatedGroupChat = {
        chats: action.chats,
        readError: null,
        chatsLoading: false
    };
    return updateObject(state, updatedGroupChat);
};

export const fetchChatsFailed = (state, action) => {
    return updateObject(state, {readError: action.error, chatsLoading: false});
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHAT_INPUT_CHANGED: return chatInputChanged(state, action);
        case actionTypes.SEND_MSG_START: return sendMsgStart(state, action);
        case actionTypes.SEND_MSG_SUCCESS: return sendMsgSuccess(state, action);
        case actionTypes.SEND_MSG_FAILED: return sendMsgFailed(state, action);
        case actionTypes.FETCH_CHATS_START: return fetchChatsStart(state, action);
        case actionTypes.FETCH_CHATS_SUCCESS: return fetchChatsSuccess(state, action);
        case actionTypes.FETCH_CHATS_FAILED: return fetchChatsFailed(state, action);
        default: return state;
    }
};

export default reducer;

