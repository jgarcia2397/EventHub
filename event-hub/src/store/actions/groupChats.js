import * as actionTypes from './actionTypes';
import axios from 'axios';

export const sendMsgStart = () => {
    return {
        type: actionTypes.SEND_MSG_START
    };
};

export const sendMsgSuccess = (content, msgTimestamp, userId) => {
    return {
        type: actionTypes.SEND_MSG_SUCCESS,
        content: content,
        msgTimestamp: msgTimestamp,
        userId: userId
    };
};

export const sendMsgFailed = (error) => {
    return {
        type: actionTypes.SEND_MSG_FAILED,
        error: error
    };
};

// Add token as parameter here later
export const sendMsg = (msgDetails) => {
    return dispatch => {
        dispatch(sendMsgStart());
        axios.post('/groupchats.json', msgDetails)
            .then(res => {
                console.log(res);
                dispatch(sendMsgSuccess(res.data.content, res.data.msgTimestamp, res.data.userId));
                // this.setState({content: ''});
                // this.getChatsFromBackend();
            })
            .catch(err => {
                console.log(err);
                dispatch(sendMsgFailed(err));
                // this.setState({ writeError: err.message });
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

export const fetchChats = () => {
    return dispatch => {
        dispatch(fetchChatsStart());
        axios.get('/groupchats.json')
            .then(res => {
                const fetchedChats = [];
                for (let key in res.data) {
                    fetchedChats.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchChatsSuccess(fetchedChats));
                // this.setState({chats: fetchedChats});
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchChatsFailed(err));
                // this.setState({ readError: err.message });
            });
    };
};