import React from "react";
import MessageForm from "./chat_message_form";

class ChatDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            messages: [] 
        };
        this.bottom = React.createRef();
        this.channelName = "this.props.channel.name";
        // this.channelName = this.props.channel.name;
        this.channelId = 1;
        // this.channelId = this.props.channel.id;
        this.channelIcon = "channelURL";
        // this.channelIcon = this.props.channel.icon;
    }

    componentDidMount() {
        App.cable.subscriptions.create(
            { channel: this.state.channelName, id: this.state.channelId },
            {
                received: data => {
                    switch (data.type) {
                        case "message":
                            this.setState({
                                messages: this.state.messages.concat(data.message)
                            });
                            break;
                        case "messages":
                            debugger
                            this.setState({ messages: Object.values(data.messages) });
                            break;
                    }
                },
                speak: function (data) { return this.perform("speak", data) },
            }
        );
    }

    componentDidUpdate() {
        this.bottom.current.scrollIntoView();
    }

    render() {
        const messageList = this.state.messages.map((message, idx) => {
            return (
                <li key={idx}>
                    {message.message}
                    <div ref={this.bottom} />
                </li>
            );
        });
        return (
            <div className="chat-display">
                <div>ChatRoom</div>
                <div className="message-list">{messageList}</div>
                <MessageForm />
            </div>
        );
    }
}

export default ChatDisplay;
