import React from "react";

class ChatCreateChannel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            channelName: '',
            errors: [],
            channelIcon: '',
        };
        this.update = this.update.bind(this);
        this.selectIcon = this.selectIcon.bind(this);
        this.createChannel = this.createChannel.bind(this);
        this.images = ["defaultchannel1URL", "defaultchannel2URL", "defaultchannel3URL", "defaultchannel4URL",
            "defaultchanne51URL", "defaultchannel6URL", "defaultchanne73URL", "defaultchannel8URL"]
    }

    update(e){
        this.setState({
            channelName: e.currentTarget.value
        })
    }

    selectIcon(icon){
        this.setState({
            channelIcon: icon
        })
    }

    createChannel(){
        if (this.state.channelIcon !== '' && this.state.channelName.length >= 6){
            let currentUser = this.props.currentUser;
            let channelName = this.state.channelName;
            let users = Object.values(this.props.groupUsers);
            users.push(currentUser);
            this.props.createChannel({
                name: channelName,
                channel_icon: "defaultchannelURL",
                group_id: this.props.groupId,
                dm: false,
            })
                .then(data => {
                    if (data.channel.oldChannel === undefined) {
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
            this.props.toggleModal("channel");
            this.setState({
                channelName: '',
                errors: [],
                channelIcon: '',
            })
        } else if (this.state.channelName.length < 6 || this.state.channelIcon === '' ) {
            if (this.state.channelName.length < 6){
                let errors = this.state.errors;
                errors.push("Channel name must be at least 6 characters")
                this.setState({ errors })
            }
            if (this.state.channelIcon === '') {
                let errors = this.state.errors;
                errors.push("Channel must have an icon selected")
                this.setState({ errors })
            } 
        }
    }

    render(){
        if (this.props.show){
            return (
                <div className="chat-dm-modal">
                    <div className="chat-dm-actions">
                        <i onClick={this.props.closeModal} className="fas fa-times"></i>
                    </div>
                    <div className="chat-dm-content">
                        <div className="chat-dm-search-container">
                            <input
                                onChange={this.update}
                                value={this.state.channelName}
                                placeholder="Name the channel"
                                className="chat-dm-search" />
                            <div 
                                onClick={this.createChannel}
                                className="chat-dm-search-go">
                                GO
                            </div>
                        </div>
                        <div className="chat-dm-errors">
                            {this.state.errors.map((error, i) => (
                                <li
                                    key={i}
                                    className="chat-dm-errors-item">
                                    {error}
                                </li>
                            ))}
                        </div>
                        <div className="chat-dm-icon-index">
                            {this.images.map( (icon,i)=>(
                                <img 
                                    key={i}
                                    className={icon === this.state.channelIcon ? "chat-dm-icon-index-item-selected" : "chat-dm-icon-index-item" }
                                    onClick={()=>this.selectIcon(icon)}
                                    src={window[icon]}/>
                            ))}
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