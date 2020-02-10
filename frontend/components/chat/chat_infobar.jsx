
import React from "react";

class ChatInfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        if (this.props.loadInfoBar){
            return (
                <div className="chat-info-bar">
                    Chat Info Bar
                <p>{this.props.selectedChannel.name}</p>
                    <p>{Object.values(this.props.groupUsers).length} users in the group</p>
                    <p>{Object.values(this.props.channelUsers).length} users in the channel</p>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}

export default ChatInfoBar;