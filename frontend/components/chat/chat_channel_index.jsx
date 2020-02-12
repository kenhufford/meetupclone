
import React from "react";
import ChatDirectMessageInvite from './chat_direct_message_invite';

class ChatChannelIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.closeModal = this.closeModal.bind(this);
    }
    // left off here, need to make channel, channelships with people
    directMessage(){
        this.props.createChannel({
            name: "new channel",
            channel_icon: "defaultchannelURL",
            group_id: this.props.groupId
        })
            .then( (channel)=>{

            })
    }

    showModal(){
        this.setState({
            show: true
        });
    };

    closeModal(){
        this.setState({
            show: false
        });
    };

    render() {
        let channels = this.props.channels;
        let groupChannels;
        let userChannels;
        groupChannels = channels.groupChannels !== undefined ? Object.values(channels.groupChannels) : [];
        userChannels = channels.userChannels !== undefined ? Object.values(channels.userChannels) : [];
        let groupChannelList;
        let userChannelList;
        if (groupChannels.length !== 0) {
            groupChannelList = groupChannels.map((channel, i) =>
                (<li key={i} onClick={() => this.props.selectChannel(channel.id, "group")}>
                    {channel.name}
                </li>))
        } else {
            groupChannelList = <p>Pick a group</p>
        }

        if (userChannels.length !== 0) {
            userChannelList = userChannels.map((channel, i) =>
                (<li key={i} value={channel.id} onClick={() => this.props.selectChannel(channel.id, "user")}>
                    {channel.name}
                </li>))
        } else {
            userChannelList = <p>Pick a group</p>
        }

        
        return (
            <div className="chat-channel-index">
                <p>Channels</p>
                <ul className="chat-channel-list">
                    {groupChannelList}
                    <li>Add a channel</li>
                </ul>
                <ul className="chat-channel-list">
                    {userChannelList}
                    <button className="toggle-button" onClick={ (e) => this.showModal()}> show Modal 
                    </button>
                    <ChatDirectMessageInvite 
                        show={this.state.show} 
                        closeModal={this.closeModal} 
                        channels={this.props.channels}
                        groupId={this.props.groupId}
                        groupUsers={this.props.groupUsers}
                        createChannel={this.props.createChannel}
                        selectChannel={this.props.selectChannel}
                        createChannelship={this.props.createChannelship}
                        selectAfterCreateChannel={this.props.selectAfterCreateChannel}
                        currentUser={this.props.currentUser}
                        />
                </ul>
            </div>
        )
    }
}

export default ChatChannelIndex;