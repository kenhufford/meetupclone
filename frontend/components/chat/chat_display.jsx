import React from "react";
import MessageForm from "./chat_message_form";
import { formatTime } from "../../utils/date_util";

class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            messages: []
        };
        this.bottom = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (!this.props.selectedChannel) return null
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView();
        }
        let oldChannelId = prevProps.selectedChannelId;
        let channelId = this.props.selectedChannelId;
        let channel = this.props.selectedChannel;
        if (oldChannelId !== channelId) {
            this.setupSocket();
            this.props.fetchChannelMessages(channel)
                .then(data => {
                    let messages = Object.values(data.messages);
                    this.setState({
                        messages
                    })
                });
        }
    }

    setupSocket(){
        if(this.props.selectedChannelId === '') return null
        if (App.currentChannel) {
            App.currentChannel.unsubscribe();
        }
        debugger
        App.cable.subscriptions.create(
            { channel: "ChatChannel", id: this.props.selectedChannelId},
            {
                received: data => {
                    switch (data.type) {
                        case "message":
                            let {message, user_id, channel_id, updated_at, created_at} = data.message
                            let newMsg = {
                                message,
                                userId: user_id,
                                channelId: channel_id,
                                updatedAt: updated_at,
                                createdAt: created_at
                            }
                            
                            this.setState({
                                messages: this.state.messages.concat(newMsg)
                            });
                            break;
                    }
                },
                speak: function (data) { return this.perform("speak", data) },
            }
        );
    }

    render() {
        
        const messageList = this.state.messages.map((message, idx) => {
            if (this.props.channelUsers[message.userId]===undefined) return null
            return (
                <li key={idx}>
                    <div className="chat-message">
                        <img src={window[this.props.channelUsers[message.userId].imageUrl]}/>
                        <div className="chat-message-right">
                            <div className="chat-message-info">
                                <p className="chat-message-name">{this.props.channelUsers[message.userId].name}</p>
                                <p className="chat-message-time">{formatTime(message.createdAt)}</p>
                            </div>
                            <div className="chat-message-message">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div ref={this.bottom} />
                </li>
            );
        });
        return (
            <div className="chat-display">
                <div>ChatRoom</div>
                <ul className="message-list">{messageList}</ul>
                <MessageForm 
                    userId={this.props.userId}
                    selectedChannelId={this.props.selectedChannelId}/>
            </div>
        );
    }
}

export default ChatDisplay;
