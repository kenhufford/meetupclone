
import React from "react";
import ChatInfoBar from './chat_infobar';
import ChatDisplay from './chat_display';

class ChatChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <React.Fragment>
                <ChatInfoBar
                    selectedChannel={this.props.selectedChannel}
                    channelUsers={this.props.channelUsers}
                    loadInfoBar={this.props.loadInfoBar}
                />
                <ChatDisplay
                    receiveMessage={this.props.receiveMessage}
                    userId={this.props.userId}
                    selectedChannel={this.props.selectedChannel}
                    channelUsers={this.props.channelUsers}
                    updateChannel={this.props.updateChannel}
                    updateChannelship={this.props.updateChannelship}
                    fetchChannelMessages={this.props.fetchChannelMessages}
                />
            </React.Fragment>
        )
    }
}

export default ChatChannel;