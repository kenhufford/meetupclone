import React from "react";
import MessageForm from "./chat_message_form";
import ChatMessageIndex from "./chat_message_index";

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
        let { channelUsers, userId, selectedChannel} = this.props;
        let { messages } = this.state;
        return (
            <div className="chat-display">
                <ChatMessageIndex 
                    channelUsers={channelUsers}
                    messages={messages}
                    bottom={this.bottom}
                    />
                <MessageForm 
                    userId={userId}
                    selectedChannelId={selectedChannel.id}/>
            </div>
        );
    }
}

export default ChatDisplay;
