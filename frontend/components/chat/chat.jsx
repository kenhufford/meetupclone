
import React from "react";
import ChatChannelIndex from './chat_channel_index';
import ChatDisplay from './chat_display';
import ChatGroupIndex from './chat_group_index';
import ChatInfoBar from './chat_infobar';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="chat-main">
                    <div className="chat-main-left">
                        <ChatGroupIndex />
                        <ChatChannelIndex />
                    </div>
                    <div className="chat-main-right">
                        <ChatInfoBar />
                        <ChatDisplay />
                    </div>
                </div>
            </div>

        )
    }
}

export default Chat;