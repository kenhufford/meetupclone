import React from "react";

class ChatDirectMessageInvite extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filteredUsers: [],
            searchTerm: '',
            addedToChannel: {},
        };
        this.update = this.update.bind(this);
        this.addToChannel = this.addToChannel.bind(this);
        this.removeFromChannel = this.removeFromChannel.bind(this);
        this.createChannel = this.createChannel.bind(this);
    }

    update(e){
        let filteredUsers = Object.values(this.props.groupUsers).filter(user => 
            user.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
            && user.name !== this.props.currentUser.name)
        this.setState({
            filteredUsers,
            searchTerm: e.currentTarget.value
        })
    }

    addToChannel(user){
        let addedToChannel = Object.assign({}, this.state.addedToChannel);
        addedToChannel[user.id] = user;
        this.setState({
            addedToChannel,
            searchTerm: ''
        })
    }

    removeFromChannel(userId){
        let addedToChannel = Object.assign({}, this.state.addedToChannel);
        delete addedToChannel[userId];
        this.setState({
            addedToChannel
        })
    }

    createChannel(){
        let currentUser = this.props.currentUser;
        let channelName = '';
        let hashString = this.props.groupId;
        let users = [];
        let channel_icon1;
        let channel_icon2;
        let selectAfterCreateChannel = this.props.selectAfterCreateChannel;
        users.push(currentUser);
        users = users.concat(Object.values(this.state.addedToChannel));
        users.sort();
        users.forEach((user, i) => {
            hashString += user.id.toString()+user.name;
            if (i === 0){
                channelName += user.name;
            } else if (i < users.length){
                channelName += `, ${user.name}`
            }
        })
        if(users.length<3){
            channel_icon1 = users[0].imageUrl;
            channel_icon2 = users[1].imageUrl;
        } else {
            channel_icon1 = users[1].imageUrl;
            channel_icon2 = users[2].imageUrl;
        }
        this.props.createChannel({
            name: channelName,
            channel_icon: channel_icon1,
            channel_icon2: channel_icon2,
            group_id: this.props.groupId,
            dm: true,
            hash_string: hashString
        })
            .then( data => {
                if (data.channel.oldChannel === undefined){
                    users.forEach((user, i) => {
                        if (i !== users.length - 1) {
                            this.props.createChannelship({
                                channel_id: data.channel.id,
                                user_id: user.id,
                                moderator: true,
                                group_id: this.props.groupId
                            }); 
                        } else {
                            this.props.createChannelship({
                                channel_id: data.channel.id,
                                user_id: user.id,
                                moderator: true,
                                group_id: this.props.groupId
                            })
                                .then(() => {
                                    this.props.selectAfterCreateChannel(data.channel)
                                })
                        }
                    })
                } else {
                    selectAfterCreateChannel(data.channel.oldChannel)
                } 
            })
        this.props.toggleModal("dm");
        this.setState({
            filteredUsers: [],
            searchTerm: '',
            addedToChannel: {},
        })
    }

    selectChannel(channel){
        this.props.selectChannel(channel);
        this.props.toggleModal("dm");
        this.setState({
            filteredUsers: [],
            searchTerm: '',
            addedToChannel: {},
        })
    }

    render(){
        if (this.props.show){
            let index;
            let dmChannelsToggle = false;
            let addedToChannelToggle = this.state.addedToChannel.length !== 0;

            if (this.state.filteredUsers.length===0 || this.state.searchTerm === ''){
                if (this.props.userChannels.length === 0){
                    index = <li>No recent messages</li>
                } else {
                    dmChannelsToggle = true;
                    let dmChannels = this.props.userChannels.sort((a, b) => { return a.name < b.name ? -1 : 1 });
                    index = dmChannels.map((channel, i) => {
                        if (channel.dm){
                            return (
                                <div key={channel.id}
                                    className="chat-modal-list-item"
                                    onClick={() => this.selectChannel(channel)}>
                                    <img src={window[channel.channelIcon]}
                                        className="chat-message-img">
                                    </img>
                                    <img src={window[channel.channelIcon2]}
                                        className="chat-message-img2">
                                    </img>
                                    <p> {channel.name} </p>
                                </div>)
                        }
                    })
                }
            } else {
                    let filteredUsers = this.state.filteredUsers.sort((a, b) => { return a.name < b.name ? -1 : 1 });
                    index = filteredUsers.map((user) => (
                        <div key={user.id}
                            className="chat-modal-list-item"
                            onClick={() => this.addToChannel(user)}>
                            <img src={window[user.imageUrl]}
                                className="chat-message-img">
                            </img>
                            <p> {user.name} </p>
                        </div>

                    ))
            }
            return (
                <div className="chat-dm-modal">
                    <div className="chat-dm-actions">
                        <i onClick={()=>this.props.toggleModal("dm")} className="fas fa-times"></i>
                    </div>
                    <div className="chat-dm-content">
                        <p className="chat-modal-large">Direct Messages</p>
                        <div className="chat-dm-search-container">
                            <input
                                onChange={this.update}
                                value={this.state.searchTerm}
                                placeholder="Search for members"
                                className="chat-dm-search" />
                            <div 
                                onClick={this.createChannel}
                                className="chat-dm-search-go">
                                GO
                            </div>
                        </div>
                        {addedToChannelToggle ?
                            (<ul className="chat-horiz-list">
                                {Object.values(this.state.addedToChannel).map((user) => (
                                    <div className="chat-horiz-list-item" key={user.id}>
                                        <img className="chat-message-img"
                                            src={window[user.imageUrl]}></img>
                                        <p> {user.name} </p>
                                        <i onClick={() => this.removeFromChannel(user.id)}
                                            className="fas fa-times"></i>
                                    </div>
                                ))}
                            </ul>) : <div></div>}
                        <ul className="chat-modal-list"> 
                            {dmChannelsToggle ? <div className="chat-modal-small">Recent Conversations</div> : <div></div>}
                            {index}
                        </ul>

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

export default ChatDirectMessageInvite;