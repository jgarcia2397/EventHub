import React, { Component } from 'react';
import axios from '../../axios-events';

import classes from './GroupChats.module.css';
import ChatMessage from '../../components/ChatMessage/ChatMessage';

class GroupChats extends Component {
    state = {
        chats: [],
        content: '',
        readError: null,
        writeError: null
    }

    componentDidMount() {
        // this.getChatsFromBackend();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.chats !== this.state.chats;
    // }

    getChatsFromBackend = () => {
        // axios.get('/groupchats.json')
        //     .then(res => {
        //         const fetchedChats = [];
        //         for (let key in res.data) {
        //             fetchedChats.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({chats: fetchedChats});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({ readError: err.message });
        //     });
    }

    inputChangedHandler = (event) => {
        this.setState({content: event.target.value});
    }

    msgSubmitHandler = (event) => {
        event.preventDefault();

        let msgTimestamp = Date.now();

        const msgDetails = {
            msgTimestamp: msgTimestamp,
            content: this.state.content
        }

        this.setState({writeError: null});
        // axios.post('/groupchats.json', msgDetails)
        //     .then(res => {
        //         console.log(res);
        //         this.setState({content: ''});
        //         this.getChatsFromBackend();
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({ writeError: err.message });
        //     });
    }

    render () {
        let chatWindow = null;
        chatWindow = (
            this.state.chats.map(chatMsg => (
                <ChatMessage
                    key={chatMsg.msgTimestamp}
                    timestamp={chatMsg.msgTimestamp}
                    content={chatMsg.content} />
            ))
        );

        return (
            <div className={classes.GroupChat}>
                <div className={classes.MessageList}>
                    {chatWindow}
                </div>
                <form onSubmit={this.msgSubmitHandler} className={classes.MessageForm}>
                    <input onChange={this.inputChangedHandler} value={this.state.content}></input>
                    {this.state.error ? <p>{this.state.writeError}</p> : null}
                    <button type="submit" disabled={this.state.content === ''}>Send</button>
                </form>
            </div>
        );
    }
}

export default GroupChats;