
import React from "react";
import ChatDirectMessageInvite from './chat_direct_message_invite';
import ChatCreateChannel from './chat_create_channel';
import {moreRecentOrEqualThanDate} from '../../utils/date_util';

class ChatChannelIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDmModal: false,
            showChannelModal: false,
            userChannels: {},
            groupChannels: {},
            loaded: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.clearNotify = this.clearNotify.bind(this);
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

    clearNotify(e){
        e.currentTarget.className = "chat-channel-index-item";
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
        } else if (type === "channel"){
            let showChannelModal = !this.state.showChannelModal;
            this.setState({
                showChannelModal
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
        let groupChannels = this.state.groupChannels !== undefined ? Object.values(this.state.groupChannels ) : [];
        let userChannels = this.state.userChannels !== undefined ? Object.values(this.state.userChannels) : [];
        let groupChannelList;
        let userChannelList;
        if (groupChannels.length !== 0) {
            groupChannelList = groupChannels.map((channel, i) =>{
                let notify = !moreRecentOrEqualThanDate(channelToChannelshipHash[channel.id].lastVisited, channel.updatedAt); 
                return (<div key={i} className="chat-channel-dm-container">
                        <i className="far fa-circle"></i>
                    <li 
                        onClick={(e) => {
                            this.props.selectChannel(channel);
                            this.clearNotify(e)
                        }}

                        className={notify ? ("chat-channel-index-item-notify") : ("chat-channel-index-item")}>
                        {channel.name}
                    </li>
                    </div>)})
        } else {
            groupChannelList = <p>Pick a group</p>
        }

        if (userChannels.length !== 0) {
            userChannelList = userChannels.map((channel, i) =>
                (
                    <div key={i} className="chat-channel-dm-container">
                    <i className="far fa-circle"></i>
                    <li 
                        value={channel.id}
                        className="chat-channel-index-item"
                        onClick={() => this.props.selectChannel(channel)}>
                        {channel.name}
                    </li>
                </div>))
        } else {
            userChannelList = <p>Pick a group</p>
        }

        
        return (
            <div className="chat-channel-index">
                <p>{this.props.groupName}</p>
                <div className="chat-channel-dm-div">
                    <p>Add Channel</p>
                    <i className="fas fa-plus-circle"
                        onClick={(e) => this.toggleModal("channel")} 
                        >
                    </i>
                    <ChatCreateChannel
                        show={this.state.showChannelModal}
                        toggleModal={this.toggleModal}
                        groupId={this.props.groupId}
                        groupUsers={this.props.groupUsers}
                        createChannel={this.props.createChannel}
                        createChannelship={this.props.createChannelship}
                        selectAfterCreateChannel={this.props.selectAfterCreateChannel}
                        currentUser={this.props.currentUser}
                    />
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