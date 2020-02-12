import React from "react";

class ChatDirectMessageInvite extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filteredUsers: [],
            searchTerm: '',
            users: this.props.groupUsers,
            dmChannels: [],
            addedToChannel: {},
        };
        this.update = this.update.bind(this);
        this.addToChannel = this.addToChannel.bind(this);
        this.removeFromChannel = this.removeFromChannel.bind(this);
        this.createChannel = this.createChannel.bind(this);
    }

    componentDidMount(){
        let dmChannels = [];
        if (this.props.channels.userChannels !== undefined) {
            dmChannels = Object.values(this.props.channels.userChannels).map(channel => (channel))
        } 
        this.setState({
            dmChannels
        })
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
        let hashString = '';
        let users = [];
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
        this.props.createChannel({
            name: channelName,
            channel_icon: currentUser.imageUrl,
            group_id: this.props.groupId,
            dm: true,
            hash_string: hashString
        })
            .then( data => {
                if (data.channel.oldChannel === undefined){
                    users.forEach((user, i) => {
                        this.props.createChannelship({
                            channel_id: data.channel.id,
                            user_id: user.id,
                            moderator: true,
                            group_id: this.props.groupId
                        });
                   
                    })
                    this.props.selectAfterCreateChannel(data.channel)
                } else if (data.oldChannel !== undefined) {
                    this.props.selectAfterCreateChannel(data.channel.oldChannel)
                } 
            })
        this.props.closeModal();
        this.setState({
            filteredUsers: [],
            searchTerm: '',
            users: this.props.groupUsers,
            dmChannels: [],
            addedToChannel: {},
        })
    }

    render(){
        if (this.props.show){
            let index;
            if (this.state.filteredUsers.length===0){
                if (this.state.dmChannels.length === 0){
                    index = <li>No recent messages</li>
                } else {
                    index = this.state.dmChannels.map((channel, i) => (
                        <li key={i} onClick={() => this.selectChannel(channel, "user")}>
                            {channel.name}
                        </li>
                    ))
                }
            } else {
                index = this.state.filteredUsers.map((user) => (
                        <li key={user.id} onClick={() => this.addToChannel(user)}>
                            {user.name}
                        </li>
                    ))
            }
            return (
                <div className="chat-dm-modal">
                    <div className="chat-dm-actions">
                        <i onClick={this.props.closeModal} className="fas fa-times"></i>
                    </div>
                    <div className="chat-dm-content">
                        <p>Direct Messages</p>
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

                        <ul> 
                            {index}
                        </ul>
                        <ul> Added To Channel
                            {Object.values(this.state.addedToChannel).map((user) => (
                                <li key={user.id} onClick={()=>this.removeFromChannel(user.id)}>
                                    {user.name}
                                </li>
                            ))}
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