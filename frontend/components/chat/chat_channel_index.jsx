
import React from "react";
import ChatDirectMessageInvite from './chat_direct_message_invite';
import ChatCreateChannel from './chat_create_channel';
import ChatJoinChannel from './chat_join_channel';
import ChatChannelIndexItem from './chat_channel_index_item';
import {moreRecentOrEqualThanDate} from '../../utils/date_util';

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
            console.log('index updated')
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
                let notify = !moreRecentOrEqualThanDate(channelToChannelshipHash[channel.id].lastVisited, channel.updatedAt);
                return (<ChatChannelIndexItem  
                            notify={notify}
                            dm={false}
                            key={i}
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
                return (<ChatChannelIndexItem
                    notify={notify}
                    dm={true}
                    key={i}
                    removeChannelship={this.props.removeChannelship}
                    selectChannel={this.props.selectChannel}
                    channel={channel} />)
            })
        } else {
            userChannelList = <p></p>
        }

        return (
            <div className="chat-channel-index">
                <p>{this.props.groupName}</p>
                <div className="chat-channel-dm-div">
                    <p>Add New Channel</p>
                    <ChatCreateChannel
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
                    <i className="fas fa-plus-circle"
                        onClick={(e) => this.toggleModal("createChannel")} 
                        >
                    </i>
                </div>
                <div className="chat-channel-dm-div">
                    <p>Join Channel</p>
                    <ChatJoinChannel
                        show={this.state.showJoinChannelModal}
                        toggleModal={this.toggleModal}
                        groupId={this.props.groupId}
                        userChannels={this.state.userChannels}
                        groupChannels={this.state.groupChannels}
                        createChannelship={this.props.createChannelship}
                        currentUser={this.props.currentUser}
                        selectChannel={this.props.selectChannel}
                    />
                    <i className="fas fa-plus-circle"
                        onClick={(e) => this.toggleModal("joinChannel")} 
                        >
                    </i>
                </div>
                <ul className="chat-channel-list">
                    {groupChannelList}
                </ul>
                <ul className="chat-channel-list">
                    <div className="chat-channel-dm-div">
                        <p>Direct Messages</p>
                        <i className="fas fa-plus-circle"
                            onClick={(e) => this.toggleModal("dm")}>
                        </i>
                    </div>
                    
                    {userChannelList}
                    <ChatDirectMessageInvite 
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
                        />
                </ul>
            </div>
        )
    }
}

export default ChatChannelIndex;