
import React from "react";

class ChatChannelIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let channels = Object.values(this.props.channels);
        let channelList;
        if (channels.length !== 0) {
            channelList = channels.map((channel, i) =>
                (<li key={i} value={channel.id} onClick={this.props.selectChannel}>
                    {channel.name}
                </li>))
        } else {
            channelList = <p>Pick a group</p>
        }
        return (
            <div className="chat-channel-index">
                Channel index
                <ul>
                    {channelList}
                    <li>Add a channel</li>
                </ul>
            </div>
        )
    }
}

export default ChatChannelIndex;