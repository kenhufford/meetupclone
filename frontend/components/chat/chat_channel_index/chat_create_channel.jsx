import React from "react";

class ChatCreateChannel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filteredUsers: [],
            searchTerm: '',
            addedToChannel: {},
            channelName: '',
            errors: [],
            channelIcon: '',
        };
        this.update = this.update.bind(this);
        this.addToChannel = this.addToChannel.bind(this);
        this.removeFromChannel = this.removeFromChannel.bind(this);
        this.selectIcon = this.selectIcon.bind(this);
        this.createChannel = this.createChannel.bind(this);
        this.images = ["defaultchannel1URL", "defaultchannel2URL", "defaultchannel3URL", "defaultchannel4URL",
            "defaultchannel5URL", "defaultchannel6URL", "defaultchannel7URL", "defaultchannel8URL"]
    }

    update(e, field){
        if (field === "searchTerm"){
            let filteredUsers = Object.values(this.props.groupUsers).filter(user =>
                user.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
                && user.name !== this.props.currentUser.name)
            this.setState({
                [field]: e.currentTarget.value,
                filteredUsers
            })
        } else {
            this.setState({
                [field]: e.currentTarget.value,
            })
        }

    }

    selectIcon(icon){
        this.setState({
            channelIcon: icon
        })
    }

    addToChannel(user) {
        let addedToChannel = Object.assign({}, this.state.addedToChannel);
        addedToChannel[user.id] = user;
        this.setState({
            addedToChannel,
            searchTerm: ''
        })
    }

    removeFromChannel(userId) {
        let addedToChannel = Object.assign({}, this.state.addedToChannel);
        delete addedToChannel[userId];
        this.setState({
            addedToChannel
        })
    }

    createChannel(){
        if (this.state.channelIcon !== '' && this.state.channelName.length >= 6){
            let channelName = this.state.channelName;
            let users = [];
            users.push(this.props.currentUser);
            users = users.concat(Object.values(this.state.addedToChannel));
            this.props.createChannel({
                name: channelName,
                channel_icon: this.state.channelIcon,
                group_id: this.props.groupId,
                dm: false,
            })
                .then(data => {
                    let channel = data.channel;
                    users.forEach((user, i) => {
                        if (i !==users.length-1){
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
                                .then( () => {
                                    this.props.selectChannel(channel)
                                })
                        }
                    })
                    
                })
            this.props.toggleModal("createChannel");
            this.setState({
                filteredUsers: [],
                searchTerm: '',
                addedToChannel: {},
                channelName: '',
                errors: [],
                channelIcon: '',
            })
        } else if (this.state.channelName.length < 6 || this.state.channelIcon === '' ) {
            if (this.state.channelName.length < 6){
                let errors = this.state.errors;
                if (!errors.includes("Channel name must be at least 6 characters")){
                    errors.push("Channel name must be at least 6 characters")
                }
                
                this.setState({ errors })
            }
            if (this.state.channelIcon === '') {
                let errors = this.state.errors;
                if (!errors.includes("Channel must have an icon selected")) {
                    errors.push("Channel must have an icon selected")
                }
                this.setState({ errors })
            } 
        }
    }

    render(){
        if (this.props.show){
            let addedToChannelToggle = this.state.addedToChannel.length !== 0;
            let index = this.state.filteredUsers.map((user) => (
                <div key={user.id}
                    className="chat-modal-list-item"
                    onClick={() => this.addToChannel(user)}>
                    <img src={window[user.imageUrl]}
                        className="chat-message-img">
                    </img>
                    <p> {user.name} </p>
                </div>
            ))
            return (
                <div className="chat-dm-modal">
                    <div className="chat-dm-actions">
                        <i onClick={()=>this.props.toggleModal("createChannel")} className="fas fa-times"></i>
                    </div>
                    <div className="chat-dm-content">
                        <p>Create Channel</p>
                        <div className="chat-dm-search-container">
                            <input
                                onChange={(e) => this.update(e, "channelName")}
                                value={this.state.channelName}
                                placeholder="Name the channel"
                                className="chat-dm-search" />
                        </div>
                        <p>Add members</p>
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
                        <div className="chat-dm-search-container">
                            <input
                                onChange={(e) => this.update(e, "searchTerm")}
                                value={this.state.searchTerm}
                                placeholder="Search for members"
                                className="chat-dm-search" />
                        </div>
                        {index}
                        <div className="chat-dm-errors">
                            {this.state.errors.map((error, i) => (
                                <li
                                    key={i}
                                    className="chat-dm-errors-item">
                                    {error}
                                </li>
                            ))}
                        </div>
                        <p>Select an icon for the channel</p>
                        <div className="chat-dm-icon-index">
                            
                            {this.images.map( (icon,i)=>(
                                <img 
                                    key={i}
                                    className={icon === this.state.channelIcon ? "chat-dm-icon-index-item-selected" : "chat-dm-icon-index-item" }
                                    onClick={()=>this.selectIcon(icon)}
                                    src={window[icon]}/>
                            ))}
                        </div>
                        <div
                            onClick={this.createChannel}
                            className="chat-channel-create">
                            CREATE
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

export default ChatCreateChannel;