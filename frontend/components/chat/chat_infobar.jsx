
import React from "react";

class ChatInfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let infobar = !this.props.selectedChannel ? 
            (   <div className="chat-info-bar">
                    <p>Select a channel</p>
                </div>)
                :
            (<div className="chat-info-bar">
                <p>{this.props.selectedChannel.name}</p>
                <p>{Object.values(this.props.groupUsers).length} users in the group</p>
                <p>{Object.values(this.props.channelUsers).length} users in the channel</p>
            </div> )

        if (this.props.loadInfoBar){
            return (
                <div>
                    {infobar}
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