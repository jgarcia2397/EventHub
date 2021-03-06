import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

export const setChatEventId = (eventId, eventName, eventDate, eventCreator) => {
    return {
        type: actionTypes.SET_CHAT_EVENT_ID,
        chatId: eventId,
        eventName: eventName,
        eventDate: eventDate,
        eventCreator: eventCreator
    };
};

export const chatInputChanged = (content) => {
    return {
        type: actionTypes.CHAT_INPUT_CHANGED,
        content: content
    };
};

export const sendMsgStart = () => {
    return {
        type: actionTypes.SEND_MSG_START
    };
};

export const sendMsgSuccess = (id, msgDetails) => {
    return {
        type: actionTypes.SEND_MSG_SUCCESS,
        msgId: id,
        msgDetails: msgDetails
    };
};

export const sendMsgFailed = (error) => {
    return {
        type: actionTypes.SEND_MSG_FAILED,
        error: error
    };
};

export const sendMsg = (msgDetails, chatId, token) => {
    return dispatch => {
        dispatch(sendMsgStart());

        const queryParams = 'auth=' + token;

        axios.post('/events/' + chatId + '/chats.json?' + queryParams, msgDetails)
            .then(res => {
                dispatch(sendMsgSuccess(res.data.name, msgDetails));
            })
            .catch(err => {
                dispatch(sendMsgFailed(err));
            });
    };
};

export const fetchChatsStart = () => {
    return {
        type: actionTypes.FETCH_CHATS_START
    };
};

export const fetchChatsSuccess = (chats) => {
    return {
        type: actionTypes.FETCH_CHATS_SUCCESS,
        chats: chats
    };
};

export const fetchChatsFailed = (error) => {
    return {
        type: actionTypes.FETCH_CHATS_FAILED,
        error: error
    };
};

export const fetchChats = (chatId, token) => {
    return dispatch => {
        dispatch(fetchChatsStart());

        const queryParams = 'auth=' + token;

        axios.get('/events/' + chatId + '/chats.json?' + queryParams)
            .then(res => {
                const fetchedChats = [];
                for (let key in res.data) {
                    fetchedChats.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchChatsSuccess(fetchedChats));
            })
            .catch(err => {
                dispatch(fetchChatsFailed(err));
            });
    };
};


export const sendGuestInviteStart = () => {
    return {
        type: actionTypes.SEND_GUEST_INVITE_START
    };
};

export const sendGuestInviteSuccess = (invitedUser) => {
    return {
        type: actionTypes.SEND_GUEST_INVITE_SUCCESS,
        user: invitedUser
    };
};

export const sendGuestInviteExists = () => {
    return {
        type: actionTypes.SEND_GUEST_INVITE_EXISTS
    };
};

export const sendGuestInviteNotExists = () => {
    return {
        type: actionTypes.SEND_GUEST_INVITE_NOT_EXISTS
    };
};

export const sendGuestInviteFailed = (error) => {
    return {
        type: actionTypes.SEND_GUEST_INVITE_FAILED,
        error: error
    };
};

export const sendGuestInvite = (newUserEmail, chatId, userToken) => {
    return dispatch => {
        dispatch(sendGuestInviteStart());

        const queryParams = 'auth=' + userToken;
        const queryParamsUsers = 'orderBy="email"&equalTo="' + newUserEmail + '"';


        axios.get('/users.json?' + queryParamsUsers)
            .then(res => {
                let newGuest = null;
                for (let key in res.data) {
                    newGuest = res.data[key];
                }

                if (Object.keys(res.data).length === 0) {
                    dispatch(sendGuestInviteNotExists());
                } else {
                    axios.get('/events/' + chatId + '/members.json?' + queryParamsUsers + '&' + queryParams)
                        .then(res => {
                            if (Object.keys(res.data).length === 0) {
                                axios.post('/events/' + chatId + '/members.json?' + queryParams, newGuest)
                                    .then(res => {})
                                    .catch(err => {
                                        dispatch(sendGuestInviteFailed(err));
                                    });
                                dispatch(sendGuestInviteSuccess(newGuest));
                            } else {
                                dispatch(sendGuestInviteExists());
                            }
                        })
                        .catch(err => {
                            dispatch(sendGuestInviteFailed(err));
                        });
                }
            })
            .catch(err => {
                dispatch(sendGuestInviteFailed(err));
            });
    };
};

export const fetchChatMembersStart = () => {
    return {
        type: actionTypes.FETCH_CHAT_MEMBERS_START
    };
};

export const fetchChatMembersSuccess = (members) => {
    return {
        type: actionTypes.FETCH_CHAT_MEMBERS_SUCCESS,
        members: members
    };
};

export const fetchChatMembersFailed = (error) => {
    return {
        type: actionTypes.FETCH_CHAT_MEMBERS_FAILED,
        error: error
    };
};

export const fetchChatMembers = (chatId, token) => {
    return dispatch => {
        dispatch(fetchChatMembersStart());

        const queryParams = 'auth=' + token;

        axios.get('/events/' + chatId + '/members.json?' + queryParams)
            .then(res => {
                const fetchedMembers = [];
                for (let key in res.data) {
                    fetchedMembers.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchChatMembersSuccess(fetchedMembers));
            })
            .catch(err => {
                dispatch(fetchChatMembersFailed(err));
            });
    };
};