import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import classes from './GroupChats.module.css';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import GuestList from '../../components/GuestList/GuestList';

class GroupChats extends Component {
    // state = {
    //     chats: [],
    //     content: '',
    //     readError: null,
    //     writeError: null
    // }

    componentDidMount() {
        this.props.onFetchChats(this.props.chatId, this.props.token);
    }

    inputChangedHandler = (event) => {
        // this.setState({content: event.target.value});
        this.props.onChatInputChanged(event.target.value);
    }

    msgSubmitHandler = (event) => {
        event.preventDefault();

        let msgTimestamp = Date.now();

        const msgDetails = {
            msgTimestamp: msgTimestamp,
            content: this.props.content,
            userId: this.props.userId
        }

        this.props.onSendMsg(msgDetails, this.props.chatId, this.props.token);
    }

    render () {
        let chatWindow = null;
        chatWindow = (
            this.props.chats.map(chatMsg => (
                <ChatMessage
                    key={chatMsg.id}
                    timestamp={chatMsg.msgTimestamp}
                    content={chatMsg.content}
                    isYourMsg={chatMsg.userId === this.props.userId} />
            ))
        );

        return (
            <div className={classes.ChatsPage}>
                <GuestList />
                <div className={classes.GroupChat}>
                    <div className={classes.MessageList}>
                        {chatWindow}
                    </div>
                    <form onSubmit={this.msgSubmitHandler} className={classes.MessageForm}>
                        <input onChange={this.inputChangedHandler} value={this.props.content}></input>
                        {/* {this.state.error ? <p>{this.state.writeError}</p> : null} */}
                        <button type="submit" disabled={this.props.content === ''}>Send</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chats.chats,
        content: state.chats.content,
        userId: state.auth.userId,
        chatId: state.chats.chatId,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSendMsg: (msgDetails, chatId, token) => dispatch(actions.sendMsg(msgDetails, chatId, token)),
        onFetchChats: (chatId, token) => dispatch(actions.fetchChats(chatId, token)),
        onChatInputChanged: (content) => dispatch(actions.chatInputChanged(content))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupChats);