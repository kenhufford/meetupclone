
import React from "react";
import ChatDirectMessageInvite from './chat_direct_message_invite';
import ChatCreateChannel from './chat_create_channel';
import ChatJoinChannel from './chat_join_channel';
import ChatChannelIndexList from './chat_channel_index_list';
import ChatChannelIndexHeader from './chat_channel_index_header';


class ChatChannelIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDmModal: false,
            showChannelModal: false,
            showJoinChannelModal: false,
            loaded: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        let fetchChannelshipsFromUser = this.props.fetchChannelshipsFromUser();
        let fetchGroupChannels = this.props.fetchGroupChannels(this.props.groupId);
        Promise.all([fetchGroupChannels, fetchChannelshipsFromUser])
            .then( () => {
                this.setState({
                    loaded: true
                })
            })
    }

    componentDidUpdate(prevProps){
        if (this.props.groupId !== prevProps.groupId || this.props.selectedChannel !== prevProps.selectedChannel ){
            this.props.fetchGroupChannels(this.props.groupId);
            this.props.fetchChannelshipsFromUser();
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
        let {channelships, selectedChannel} = this.props;
        let userChannelships = "userChannelships" in channelships ? channelships.userChannelships : {};
        let channelToChannelshipHash = {};
        let selectedId = selectedChannel.id
        Object.values(userChannelships).forEach(channelship => {
            channelToChannelshipHash[channelship.channelId] = {lastVisited: channelship.lastVisited}
        })
        let groupChannels = (this.props.groupChannels!==undefined) ? Object.values(this.props.groupChannels).filter(channel => !channel.dm && (channel.id in channelToChannelshipHash)) : [];
        let userChannels = (this.props.userChannels !== undefined) ? Object.values(this.props.userChannels).filter(channel => channel.dm): [];
        userChannels.sort( (a, b) => {return a.name < b.name  ? -1 : 1});
        groupChannels.sort((a, b) => { return a.name < b.name ? -1 : 1 });
        
        let createChannelModal = <ChatCreateChannel
            show={this.state.showChannelModal}
            toggleModal={this.toggleModal}
            groupId={this.props.groupId}
            groupUsers={this.props.groupUsers}
            createChannel={this.props.createChannel}
            createChannelship={this.props.createChannelship}
            selectChannel={this.props.selectChannel}
            currentUser={this.props.currentUser}
        />

        let chatJoinChannelModal = <ChatJoinChannel
            show={this.state.showJoinChannelModal}
            toggleModal={this.toggleModal}
            groupId={this.props.groupId}
            userChannels={userChannels}
            groupChannels={groupChannels}
            createChannelship={this.props.createChannelship}
            currentUser={this.props.currentUser}
            selectChannel={this.props.selectChannel}
            selectedChannel={this.props.selectedChannel}
        />

        let chatDMInviteModal= <ChatDirectMessageInvite
            show={this.state.showDmModal}
            toggleModal={this.toggleModal}
            userChannels={userChannels}
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
                <ChatChannelIndexList 
                    channels={groupChannels}
                    removeChannelship={this.props.removeChannelship}
                    selectChannel={this.props.selectChannel}
                    dm={false}
                    selectedId={selectedId}
                    channelToChannelshipHash={channelToChannelshipHash}
                    />
                <ChatChannelIndexHeader
                    headerTitle={"Direct Messages"}
                    modal={chatDMInviteModal}
                    modalType="dm"
                    toggleModal={this.toggleModal}
                />
                <ChatChannelIndexList
                    channels={userChannels}
                    removeChannelship={this.props.removeChannelship}
                    selectChannel={this.props.selectChannel}
                    dm={true}
                    selectedId={selectedId}
                    channelToChannelshipHash={channelToChannelshipHash}
                />
                
            </div>
        )
    }
}

export default ChatChannelIndex;