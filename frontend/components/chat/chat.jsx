
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
                let groups = data[0].groups;
                this.setState({
                    groups,
                });
                let groupId = Object.values(groups)[0].id;
                let fetchGroupChannels = this.props.fetchGroupChannels(groupId);
                let fetchUsersFromGroup = this.props.fetchUsersFromGroup(groupId);
                Promise.all([fetchUsersFromGroup, fetchGroupChannels])
                .then((data) => {
                    let groupUsers = data[0].users;
                    let channels = data[1].channels;
                        this.setState({
                            selectedGroupId: groupId,
                            loaded: true,
                            channels,
                            groupUsers,
                        })
                    })
            })
    }

    selectGroup(e){
        let groupId = e.currentTarget.getAttribute('value');
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

    selectChannel(channel){
        channel["groupId"] = this.state.selectedGroupId;
        let fetchChannelships = this.props.fetchChannelships(channel);
        let fetchUsersFromChannel = this.props.fetchUsersFromChannel(channel.id);
        let channelships = Object.assign({},this.state.channelships)
        this.props.updateChannelship({
            channel_id: channel.id
        })
            .then( ()=>
                Promise.all([fetchChannelships, fetchUsersFromChannel])
                    .then((data) => {
                        let channelChannelships = data[0].channelships.channelChannelships;
                        channelships[channelChannelships] = channelChannelships
                        let channelUsers = data[1].users;
                        this.setState({
                            selectedChannel: channel,
                            loaded: true,
                            channelships,
                            channelUsers,
                            loadInfoBar: true
                        });
                    })
            )
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
                                currentUser={this.props.currentUser}
                                groupId={this.state.selectedGroupId}
                                groupName={this.state.groups[this.state.selectedGroupId].name}
                                groupUsers={this.state.groupUsers}
                                // selectedChannel={this.state.selectedChannel}
                                selectChannel={this.selectChannel}
                                createChannel={this.props.createChannel}
                                fetchGroupChannels={this.props.fetchGroupChannels}
                                fetchChannelshipsFromUser={this.props.fetchChannelshipsFromUser}
                                selectAfterCreateChannel={this.selectAfterCreateChannel}
                                createChannelship={this.props.createChannelship}/>
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