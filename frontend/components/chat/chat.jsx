
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
            selectedChannelId: '',
            selectedChannelName: '',
            channelships: {},
            groupUsers: {},
            channelUsers: {},
        }

        this.selectGroup = this.selectGroup.bind(this);
        this.selectChannel = this.selectChannel.bind(this);
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
        let groupId = e.currentTarget.value;
        let fetchGroupChannels = this.props.fetchGroupChannels(groupId);
        let fetchUsersFromGroup = this.props.fetchUsersFromGroup(groupId);
        Promise.all([fetchGroupChannels, fetchUsersFromGroup])
            .then((data) => {
                let channels = data[0].channels;
                let groupUsers = data[1].users;
                this.setState({
                    selectedGroupId: groupId,
                    channels,
                    groupUsers
                })
            })
    }

    selectChannel(e){
        let channelId = e.currentTarget.value;
        let selectedChannel = this.state.channels[channelId];
        let fetchChannelships = this.props.fetchChannelships(selectedChannel);
        let fetchUsersFromChannel = this.props.fetchUsersFromChannel(channelId);
        Promise.all([fetchChannelships, fetchUsersFromChannel])
            .then((data) => {
                let channelships = data[0].channelships;
                let channelUsers = data[1].users;
                this.setState({
                    selectedChannelId: channelId,
                    selectedChannelName: selectedChannel.name,
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
                                createChannel={this.props.createChannel}
                                selectChannel={this.selectChannel}/>
                        </div>
                        <div className="chat-main-right">
                            <ChatInfoBar 
                                selectedChannel={this.state.channels[this.state.selectedChannelId]}
                                groupUsers={this.state.groupUsers}
                                channelUsers={this.state.channelUsers}
                                loadInfoBar={this.state.loadInfoBar} />
                            <ChatDisplay 
                                receiveMessage={this.props.receiveMessage}
                                userId={this.props.currentUser.id}
                                selectedChannel={this.state.channels[this.state.selectedChannelId]}
                                selectedChannelId={this.state.selectedChannelId}
                                selectedChannelName={this.state.selectedChannelName}
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