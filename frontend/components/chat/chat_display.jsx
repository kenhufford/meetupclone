import React from "react";
import MessageForm from "./chat_message_form";

class ChatDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            messages: []
        };
        this.bottom = React.createRef();
        
    }

    componentDidUpdate(prevProps) {
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
                            // this.setState({
                            //     messages: this.state.messages.concat(data.message)
                            // });
                            receiveMessage(JSON.parse(data.message));
                            break;
                    }
                },
                speak: function (data) { return this.perform("speak", data) },
            }
        );
    }

    render() {
        
        const messageList = this.state.messages.map((message, idx) => {
            return (
                <li key={idx}>
                    <div>
                        <p>{message.message}</p>
                        <p>{message.createdAt}</p>
                    </div>
                    
                    <div ref={this.bottom} />
                </li>
            );
        });
        return (
            <div className="chat-display">
                <div>ChatRoom</div>
                <div className="message-list">{messageList}</div>
                <MessageForm 
                    userId={this.props.userId}
                    selectedChannelId={this.props.selectedChannelId}/>
            </div>
        );
    }
}

export default ChatDisplay;
