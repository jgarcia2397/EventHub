import * as actionTypes from './actionTypes';
import axios from '../../axios-events';

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

// Add token as parameter here later
export const sendMsg = (msgDetails) => {
    return dispatch => {
        dispatch(sendMsgStart());
        axios.post('/groupchats.json', msgDetails)
            .then(res => {
                console.log(res);
                dispatch(sendMsgSuccess(res.data.name, msgDetails));
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