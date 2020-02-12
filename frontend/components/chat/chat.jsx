
import React from "react";
import ChatChannelIndex from './chat_channel_index';
import ChatDisplay from './chat_display';
import ChatGroupIndex from './chat_group_index';
import ChatInfoBar from './chat_infobar';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loadInfoBar: false,
            groups: {},
            selectedGroupId: '',
            channels: {},
            channelships: {},
            groupUsers: {},
            channelUsers: {},
            selectedChannel:{}
        }

        this.selectGroup = this.selectGroup.bind(this);
        this.selectChannel = this.selectChannel.bind(this);
        this.selectAfterCreateChannel = this.selectAfterCreateChannel.bind(this);
    }

    componentDidMount() {
        const fetchGroupsFromUser = this.props.fetchGroupsFromUser(this.props.currentUser.id);
        Promise.all([fetchGroupsFromUser])
            .then( (data) => {
                let groups = data[0].groups
                this.setState({
                    loaded:true,
                    groups
                });
            })
    }

    selectGroup(e){
        let groupId = e.currentTarget.getAttribute('value');
        let fetchGroupChannels = this.props.fetchGroupChannels(groupId);
        let fetchUsersFromGroup = this.props.fetchUsersFromGroup(groupId);
        Promise.all([fetchGroupChannels, fetchUsersFromGroup])
            .then((data) => {
                let channels = data[0].channels;
                console.log(channels)
                let groupUsers = data[1].users;
                this.setState({
                    selectedGroupId: groupId,
                    channels,
                    groupUsers
                })
            })
    }

    selectChannel(channelId, type){
        let selectedChannel = type === "group" ? this.state.channels.groupChannels[channelId]
            : this.state.channels.userChannels[channelId] 
         
        let fetchChannelships = this.props.fetchChannelships(selectedChannel);
        let fetchUsersFromChannel = this.props.fetchUsersFromChannel(channelId);
        Promise.all([fetchChannelships, fetchUsersFromChannel])
            .then((data) => {
                let channelships = data[0].channelships;
                let channelUsers = data[1].users;
                this.setState({
                    selectedChannel: selectedChannel,
                    loaded: true,
                    channelships,
                    channelUsers,
                    loadInfoBar: true
                });
            })
    }

    selectAfterCreateChannel(channel){
        let selectedChannel = channel;
        let fetchChannelships = this.props.fetchChannelships(channel);
        let fetchUsersFromChannel = this.props.fetchUsersFromChannel(channel.id);
        let fetchGroupChannels = this.props.fetchGroupChannels(channel.groupId);
        Promise.all([fetchChannelships, fetchUsersFromChannel, fetchGroupChannels])
            .then((data) => {
                let channelships = data[0].channelships;
                let channelUsers = data[1].users;
                let channels = data[2].channels
                this.setState({
                    selectedChannel,
                    channels,
                    loaded: true,
                    channelships,
                    channelUsers,
                    loadInfoBar: true
                });
            })
    }

    render() {
        if (this.state.loaded){
            return (
                <div>
                    <div className="chat-main">
                        <div className="chat-main-left">
                            <ChatGroupIndex 
                                groups={this.state.groups} 
                                selectGroup={this.selectGroup}/>
                            <ChatChannelIndex 
                                channels={this.state.channels}
                                groupId={this.state.selectedGroupId}
                                channelUsers={this.state.channelUsers}
                                selectChannel={this.selectChannel}
                                groupUsers={this.state.groupUsers}
                                createChannel={this.props.createChannel}
                                createChannelship={this.props.createChannelship}
                                selectAfterCreateChannel={this.selectAfterCreateChannel}
                                currentUser={this.props.currentUser}/>
                        </div>
                        <div className="chat-main-right">
                            <ChatInfoBar 
                                selectedChannel={this.state.selectedChannel}
                                groupUsers={this.state.groupUsers}
                                channelUsers={this.state.channelUsers}
                                loadInfoBar={this.state.loadInfoBar} />
                            <ChatDisplay 
                                receiveMessage={this.props.receiveMessage}
                                userId={this.props.currentUser.id}
                                selectedChannel={this.state.selectedChannel}
                                selectedChannelId={this.state.selectedChannel.id}
                                selectedChannelName={this.state.selectedChannel.name}
                                channelUsers={this.state.channelUsers}
                                fetchChannelMessages={this.props.fetchChannelMessages}
                                />
                        </div>
                    </div>
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

export default Chat;