
import React from "react";
import ChatChannelIndexContainer from './chat_channel_index/chat_channel_index_container';
import ChatChannel from './chat_channel';
import ChatGroupIndex from './chat_group_index';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loadInfoBar: false,
            selectedGroupId: '',
            groupUsers: {},
            channelUsers: {},
            selectedChannel:{}
        }
        this.selectGroup = this.selectGroup.bind(this);
        this.removeChannelship = this.removeChannelship.bind(this);
        this.selectChannel = this.selectChannel.bind(this);
        this.selectAfterCreateChannel = this.selectAfterCreateChannel.bind(this);
    }

    componentDidMount() {
        const fetchGroups = this.props.fetchGroups();
        Promise.all([fetchGroups])
            .then( (data) => {
                let groups = data[0].groups.userGroups;
                let groupId = Object.values(groups)[0].id;
                let fetchGroupChannels = this.props.fetchGroupChannels(groupId);
                let fetchUsersFromGroup = this.props.fetchUsersFromGroup(groupId);
                Promise.all([fetchUsersFromGroup, fetchGroupChannels])
                .then((data) => {
                    let groupUsers = data[0].users;
                        this.setState({
                            selectedGroupId: groupId,
                            loaded: true,
                            groupUsers,
                        })
                    })
            })
    }

    removeChannelship(channelshipId){
        this.props.deleteChannelship(channelshipId)
            .then( () => {
                let groupId = this.state.selectedGroupId;
                let fetchGroupChannels = this.props.fetchGroupChannels(groupId);
                let fetchUsersFromGroup = this.props.fetchUsersFromGroup(groupId);
                Promise.all([fetchUsersFromGroup, fetchGroupChannels])
                    .then((data) => {
                        let groupUsers = data[0].users;
                        this.setState({
                            loaded: true,
                            groupUsers,
                            selectedChannel: {},
                            loadInfoBar: false,
                        })
                    })
            });
    }

    selectGroup(group){
        let groupId = group.id
        if(this.state.selectedGroupId === groupId) return;
        let fetchUsersFromGroup = this.props.fetchUsersFromGroup(groupId);
        Promise.all([fetchUsersFromGroup])
            .then((data) => {
                let groupUsers = data[0].users;
                this.setState({
                    selectedGroupId: groupId,
                    groupUsers
                })
            })
    }

    selectChannel(channel){
        if (this.state.selectedChannel.id === channel.id) return;
        let fetchChannelships = this.props.fetchChannelships(channel);
        let fetchUsersFromChannel = this.props.fetchUsersFromChannel(channel.id);
        this.props.updateChannelship({
            channel_id: channel.id
        })
            .then( ()=>
                Promise.all([fetchChannelships, fetchUsersFromChannel])
                    .then((data) => {
                        let channelUsers = data[1].users;
                        this.setState({
                            selectedChannel: channel,
                            loaded: true,
                            channelUsers,
                            loadInfoBar: true
                        });
                    })
            )
    }

    selectAfterCreateChannel(channel) {
        debugger
        let selectedChannel = channel;
        let fetchChannelships = this.props.fetchChannelships(channel);
        let fetchUsersFromChannel = this.props.fetchUsersFromChannel(channel.id);
        let fetchGroupChannels = this.props.fetchGroupChannels(channel.groupId);
        Promise.all([fetchChannelships, fetchUsersFromChannel, fetchGroupChannels])
            .then((data) => {
                let channelships = data[0].channelships;
                let channelUsers = data[1].users;
                this.setState({
                    selectedChannel,
                    loaded: true,
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
                                groups={this.props.groups} 
                                selectGroup={this.selectGroup}/>
                            <ChatChannelIndexContainer 
                                groupId={this.state.selectedGroupId}
                                groupName={this.props.groups.allGroups[this.state.selectedGroupId].name}
                                selectedChannel={this.state.selectedChannel}
                                groupUsers={this.state.groupUsers}
                                selectChannel={this.selectChannel}
                                selectAfterCreateChannel={this.selectAfterCreateChannel}
                                removeChannelship={this.removeChannelship}/>
                        </div>
                        <div className="chat-main-right">
                            <ChatChannel 
                                loadInfoBar={this.state.loadInfoBar}
                                userId={this.props.currentUser.id}
                                selectedChannel={this.state.selectedChannel}
                                channelUsers={this.state.channelUsers}
                                updateChannel={this.props.updateChannel}
                                updateChannelship={this.props.updateChannelship}
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