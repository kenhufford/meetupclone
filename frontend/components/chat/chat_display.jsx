import React from "react";
import MessageForm from "./chat_message_form";
import { formatTime, formatDateWithDay } from "../../utils/date_util";

class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            messages: []
        };
        this.bottom = React.createRef();
        this.makeMsg = this.makeMsg.bind(this);
    }

    componentDidMount(){
        this.setupSocket();
    }

    componentDidUpdate(prevProps) {
        if (!this.props.selectedChannel) return null
        if (this.bottom.current) {
            this.bottom.current.scrollIntoView();
        }
        let oldChannelId = prevProps.selectedChannel.id;
        let channelId = this.props.selectedChannel.id;
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

    componentWillUnmount(){
        App.currentChannel.unsubscribe();
    }

    makeMsg(data){
        let channelId = this.props.selectedChannel.id
        let { message, user_id, channel_id, updated_at, created_at } = data.message
        let newMsg = {
            message,
            userId: user_id,
            channelId: channel_id,
            updatedAt: updated_at,
            createdAt: created_at
        }
        this.props.updateChannel({id: channelId})
            .then( () => {
                this.props.updateChannelship({channel_id: channelId})
            })
        this.setState({
            messages: this.state.messages.concat(newMsg)
        });
    }

    setupSocket(){
        let channelId = this.props.selectedChannel.id
        if (channelId === undefined) return null
        if (App.currentChannel) {
            App.currentChannel.unsubscribe();
        }
        App.currentChannel = App.cable.subscriptions.create(
            {   channel: "ChatChannel", 
                id: channelId
            },
            {   received: data => {
                    switch (data.type) {
                        case "message":
                            this.makeMsg(data);
                            break;
                    }
                },
                speak: function (data) { return this.perform("speak", data) },
            }
        );
    }

    render() {
        let lastDay;
        let { channelUsers, userId, selectedChannel} = this.props;
        const messageList = this.state.messages.map((message) => {
            if (channelUsers[message.userId]===undefined) return null
            let thisDay = formatDateWithDay(message.createdAt);
            let diffDay = thisDay !== lastDay;
            lastDay = thisDay;
            return (
                <li key={message.id}>
                    {diffDay ? <div className="chat-message-datedivider">
                                    <span>{thisDay}</span>
                                </div> : <div> </div>}

                    <div className="chat-message">
                        <img 
                            className="chat-message-img"
                            src={window[channelUsers[message.userId].imageUrl]}/>
                        <div className="chat-message-right">
                            <div className="chat-message-info">
                                <p className="chat-message-name">{channelUsers[message.userId].name}</p>
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
                <ul className="message-list">
                    {messageList}
                </ul>
                <MessageForm 
                    userId={userId}
                    selectedChannelId={selectedChannel.id}/>
            </div>
        );
    }
}

export default ChatDisplay;
