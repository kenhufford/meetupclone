
import React from "react";
import ChatDirectMessageInvite from './chat_direct_message_invite';
import ChatCreateChannel from './chat_create_channel';
import ChatJoinChannel from './chat_join_channel';
import ChatChannelIndexItem from './chat_channel_index_item';
import ChatChannelIndexHeader from './chat_channel_index_header';
import {moreRecentOrEqualThanDate} from '../../../utils/date_util';

class ChatChannelIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDmModal: false,
            showChannelModal: false,
            showJoinChannelModal: false,
            userChannels: {},
            groupChannels: {},
            loaded: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        let fetchChannelshipsFromUser = this.props.fetchChannelshipsFromUser();
        let fetchGroupChannels = this.props.fetchGroupChannels(this.props.groupId);
        Promise.all([fetchGroupChannels, fetchChannelshipsFromUser])
            .then( (data) => {
                let groupChannels = data[0].channels.groupChannels;
                let userChannels = data[0].channels.userChannels===undefined ? {} : data[0].channels.userChannels;
                let userChannelships = data[1].channelships.userChannelships;
                this.setState({
                    groupChannels,
                    userChannels,
                    channelships: {userChannelships},
                    loaded: true
                })
            })
    }

    componentDidUpdate(prevProps){
        if (this.props.groupId !== prevProps.groupId || this.props.selectedChannel !== prevProps.selectedChannel ){
            let fetchGroupChannels = this.props.fetchGroupChannels(this.props.groupId);
            let fetchChannelshipsFromUser = this.props.fetchChannelshipsFromUser();
            Promise.all([fetchGroupChannels, fetchChannelshipsFromUser])
                .then((data) => {
                    let groupChannels = data[0].channels.groupChannels;
                    let userChannels = data[0].channels.userChannels === undefined ? {} : data[0].channels.userChannels;
                    let userChannelships = data[1].channelships.userChannelships;
                    this.setState({
                        groupChannels,
                        userChannels,
                        channelships: { userChannelships },
                    })
                })
        }
    }

    directMessage(){
        this.props.createChannel({
            name: "new channel",
            channel_icon: "defaultchannelURL",
            group_id: this.props.groupId
        })
    }

    toggleModal(type){
        if (type === "dm"){
            let showDmModal = !this.state.showDmModal;
            this.setState({
                showDmModal
            });
        } else if (type === "createChannel"){
            let showChannelModal = !this.state.showChannelModal;
            this.setState({
                showChannelModal
            });
        } else if (type === "joinChannel"){
            let showJoinChannelModal = !this.state.showJoinChannelModal;
            this.setState({
                showJoinChannelModal
            });
        }
    }

    render() {
        if (!this.state.loaded) return null
        let userChannelships = this.state.channelships.userChannelships;
        let channelToChannelshipHash = {};
        let selectedId = this.props.selectedChannel.id
 
        Object.values(userChannelships).forEach(channelship => {
            channelToChannelshipHash[channelship.channelId] = {lastVisited: channelship.lastVisited}
        })
        let groupChannels = Object.values(this.state.userChannels).filter(channel => !channel.dm);
        let userChannels = Object.values(this.state.userChannels).filter(channel => channel.dm);
        let groupChannelList;
        let userChannelList;

        userChannels = userChannels.sort( (a, b) => {return a.name < b.name  ? -1 : 1});
        groupChannels = groupChannels.sort((a, b) => { return a.name < b.name ? -1 : 1 });
       
        if (groupChannels.length !== 0) {
            groupChannelList = groupChannels.map((channel, i) =>{
                let selected = channel.id === selectedId;
                let notify = !moreRecentOrEqualThanDate(channelToChannelshipHash[channel.id].lastVisited, channel.updatedAt);
                return (<ChatChannelIndexItem  
                            key={channel.id}
                            selected={selected}
                            notify={notify}
                            dm={false}
                            removeChannelship={this.props.removeChannelship}
                            selectChannel={this.props.selectChannel}
                            channel={channel} />)
            })
        } else {
            groupChannelList = <p></p>
        }

        if (userChannels.length !== 0) {
            userChannelList = userChannels.map((channel, i) =>{
                let notify = !moreRecentOrEqualThanDate(channelToChannelshipHash[channel.id].lastVisited, channel.updatedAt);
                let selected = channel.id === selectedId;
                return (<ChatChannelIndexItem
                    key={channel.id}
                    selected={selected}
                    notify={notify}
                    dm={true}
                    removeChannelship={this.props.removeChannelship}
                    selectChannel={this.props.selectChannel}
                    channel={channel} />)
            })
        } else {
            userChannelList = <p></p>
        }
        let createChannelModal = <ChatCreateChannel
            show={this.state.showChannelModal}
            toggleModal={this.toggleModal}
            groupId={this.props.groupId}
            groupUsers={this.props.groupUsers}
            groupChannels={this.state.groupChannels}
            createChannel={this.props.createChannel}
            createChannelship={this.props.createChannelship}
            selectAfterCreateChannel={this.props.selectAfterCreateChannel}
            currentUser={this.props.currentUser}
        />

        let chatJoinChannelModal = <ChatJoinChannel
            show={this.state.showJoinChannelModal}
            toggleModal={this.toggleModal}
            groupId={this.props.groupId}
            userChannels={this.state.userChannels}
            groupChannels={this.state.groupChannels}
            createChannelship={this.props.createChannelship}
            currentUser={this.props.currentUser}
            selectChannel={this.props.selectChannel}
            selectedChannel={this.props.selectedChannel}
        />

        let chatDMInviteModal= <ChatDirectMessageInvite
            show={this.state.showDmModal}
            toggleModal={this.toggleModal}
            userChannels={this.state.userChannels}
            groupId={this.props.groupId}
            groupUsers={this.props.groupUsers}
            createChannel={this.props.createChannel}
            selectChannel={this.props.selectChannel}
            createChannelship={this.props.createChannelship}
            selectAfterCreateChannel={this.props.selectAfterCreateChannel}
            currentUser={this.props.currentUser}
            selectedChannel={this.props.selectedChannel}
        />

        return (
            <div className="chat-channel-index">
                <p>{this.props.groupName}</p>
                <ChatChannelIndexHeader 
                    headerTitle={"Add New Channel"}
                    modal={createChannelModal}
                    modalType="createChannel"
                    toggleModal={this.toggleModal}
                    />
                <ChatChannelIndexHeader
                    headerTitle={"Join Channel"}
                    modal={chatJoinChannelModal}
                    modalType="joinChannel"
                    toggleModal={this.toggleModal}
                />
                <ul className="chat-channel-list">
                    {groupChannelList}
                </ul>
                <ChatChannelIndexHeader
                    headerTitle={"Direct Messages"}
                    modal={chatDMInviteModal}
                    modalType="dm"
                    toggleModal={this.toggleModal}
                />
                {userChannelList}
            </div>
        )
    }
}

export default ChatChannelIndex;