import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    chatId: '',
    chats: [],
    content: '',
    chatsLoading: false,
    singleMsgLoading: false,
    inviteLoading: false,
    membersLoading: false,
    error: false,
    members: []
};

export const setChatEventId = (state, action) => {
    return updateObject(state, {chatId: action.chatId});
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
        error: false,
        chats: state.chats.concat(newMsgDetails)
    };

    return updateObject(state, updatedMsgObject);
};

export const sendMsgFailed = (state, action) => {
    return updateObject(state, {error: true, singleMsgLoading: false});
};

export const fetchChatsStart = (state, action) => {
    return updateObject(state, {chatsLoading: true});
};

export const fetchChatsSuccess = (state, action) => {
    const updatedGroupChat = {
        chats: action.chats,
        error: false,
        chatsLoading: false
    };
    return updateObject(state, updatedGroupChat);
};

export const fetchChatsFailed = (state, action) => {
    return updateObject(state, {error: true, chatsLoading: false});
};

export const sendGuestInviteStart = (state, action) => {
    return updateObject(state, {inviteLoading: true});
};

export const sendGuestInviteSuccess = (state, action) => {
    const updatedMemberObject = {
        inviteLoading: false,
        members: state.members.concat(action.user),
        error: false
    };

    return updateObject(state, updatedMemberObject);
};

export const sendGuestInviteFailed = (state, action) => {
    return updateObject(state, {inviteLoading: false, error: true});
};

export const fetchChatMembersStart = (state, action) => {
    return updateObject(state, {membersLoading: true});
};

export const fetchChatMembersSuccess = (state, action) => {
    const updatedGuestList = {
        members: action.members,
        error: false,
        membersLoading: false
    };
    return updateObject(state, updatedGuestList);
};

export const fetchChatMembersFailed = (state, action) => {
    return updateObject(state, {error: true, membersLoading: false});
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
        case actionTypes.SET_CHAT_EVENT_ID: return setChatEventId(state, action);
        case actionTypes.SEND_GUEST_INVITE_START: return sendGuestInviteStart(state, action);
        case actionTypes.SEND_GUEST_INVITE_SUCCESS: return sendGuestInviteSuccess(state, action);
        case actionTypes.SEND_GUEST_INVITE_FAILED: return sendGuestInviteFailed(state, action);
        case actionTypes.FETCH_CHAT_MEMBERS_START: return fetchChatMembersStart(state, action);
        case actionTypes.FETCH_CHAT_MEMBERS_SUCCESS: return fetchChatMembersSuccess(state, action);
        case actionTypes.FETCH_CHAT_MEMBERS_FAILED: return fetchChatMembersFailed(state, action);
        default: return state;
    }
};

export default reducer;

