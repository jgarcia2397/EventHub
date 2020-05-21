import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import axios from '../../axios-events';
import moment from 'moment';
import errorHandler from '../../hoc/errorHandler/errorHandler';
import classes from './GroupChats.module.css';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import GuestList from '../../components/GuestList/GuestList';
import Spinner from '../../components/UI/Spinner/Spinner';

class GroupChats extends Component {
    state = {
        inviteInputContent: ''
    }

    componentDidMount() {
        this.props.onFetchChatMembers(this.props.chatId, this.props.token);
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
            userId: this.props.userId,
            username: this.props.username
        }

        this.props.onSendMsg(msgDetails, this.props.chatId, this.props.token);
    }

    inviteSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onSendGuestInvite(this.state.inviteInputContent, this.props.chatId, this.props.token);
        this.setState({inviteInputContent: ''});
    }

    inviteInputChangedHandler = (event) => {
        this.setState({inviteInputContent: event.target.value});
        console.log(this.state.inviteInputContent);
    }

    convertTimestampToMoment = (timestamp) => {
        return moment(timestamp).format("ddd. MMM Do");
    }

    render () {
        let chatWindow = <Spinner />;
        if (!this.props.chatsLoading) {
            chatWindow = (
                this.props.chats.map(chatMsg => (
                    <ChatMessage
                        key={chatMsg.id}
                        timestamp={this.convertTimestampToMoment(chatMsg.msgTimestamp)}
                        user={chatMsg.username}
                        content={chatMsg.content}
                        isYourMsg={chatMsg.userId === this.props.userId} />
                ))
            );
        }

        return (
            <div className={classes.ChatsPage}>
                <GuestList
                    inputChanged={this.inviteInputChangedHandler}
                    val={this.state.inviteInputContent}
                    onInvite={this.inviteSubmitHandler}
                    guests={this.props.chatMembers}
                    inviteLoading={this.props.inviteLoading}
                    membersLoading={this.props.membersLoading} />
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
        username: state.auth.username,
        chatId: state.chats.chatId,
        token: state.auth.token,
        chatMembers: state.chats.members,
        inviteLoading: state.chats.inviteLoading,
        chatsLoading: state.chats.chatsLoading,
        membersLoading: state.chats.membersLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSendMsg: (msgDetails, chatId, token) => dispatch(actions.sendMsg(msgDetails, chatId, token)),
        onFetchChats: (chatId, token) => dispatch(actions.fetchChats(chatId, token)),
        onChatInputChanged: (content) => dispatch(actions.chatInputChanged(content)),
        onSendGuestInvite: (newUserEmail, chatId, userToken) => dispatch(actions.sendGuestInvite(newUserEmail, chatId, userToken)),
        onFetchChatMembers: (chatId, token) => dispatch(actions.fetchChatMembers(chatId, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(GroupChats, axios));