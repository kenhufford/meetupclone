import React from "react";

class ChatJoinChannel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: '',
            filteredChannels: []
        };
        this.update = this.update.bind(this);
        this.createChannelship = this.createChannelship.bind(this);
        this.unjoinedGroups = [];
        Object.keys(this.props.groupChannels).forEach( (channelId) => {
            let userChannels = this.props.userChannels;
            let groupChannel = this.props.groupChannels[channelId];
            if (!Object.keys(userChannels).includes(channelId)){
                this.unjoinedGroups.push(groupChannel);
            }
        });
        this.update = this.update.bind(this);
    }

    update(e){
        let filteredChannels = this.unjoinedGroups.filter(channel =>
            channel.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
        this.setState({
            searchTerm: e.currentTarget.value,
            filteredChannels
        })
    }

    createChannelship(channel){
        this.props.createChannelship({
            channel_id: channel.id,
            user_id: this.props.currentUser.id,
            moderator: false
        })
            .then( () => {
                this.props.selectChannel(channel)
            })
        this.props.toggleModal("joinChannel");
        this.setState({
            searchTerm: '',
            filteredChannels: []
        })
    }

    render(){
        if (this.props.show){
            let index;
            if (this.state.searchTerm === '' || this.state.filteredChannels.length === 0){
                if (this.unjoinedGroups.length === 0){
                    index = (<div className="chat-modal-msg">
                                <p>You've joined all the channels</p>
                            </div>)
                } else {
                    index = this.unjoinedGroups.map((channel, i) => (
                        <div key={i}
                            className="chat-modal-list-item"
                            onClick={() => this.createChannelship(channel)}>
                            <img src={window[channel.channelIcon]}
                                className="chat-message-img">
                            </img>
                            <p> {channel.name} </p>
                        </div>))
                }
            } else {
                if (this.state.filteredChannels.length === 0) {
                    index = (<div className="chat-modal-msg">
                                 <p>No channels found</p>
                            </div>)
                } else {
                    index = this.state.filteredChannels.map((channel, i) => (
                        <div key={i}
                            className="chat-modal-list-item"
                            onClick={() => this.createChannelship(channel)}>
                            <img src={window[channel.channelIcon]}
                                className="chat-message-img">
                            </img>
                            <p> {channel.name} </p>
                        </div>))
                }
            }


            return (
                <div className="chat-dm-modal">
                    <div className="chat-dm-actions">
                        <i onClick={()=>this.props.toggleModal("joinChannel")} className="fas fa-times"></i>
                    </div>
                    <div className="chat-dm-content">
                        <p>Browse Channels</p>
                        <div className="chat-dm-search-container">
                            <input
                                onChange={(e) => this.update(e)}
                                value={this.state.searchTerm}
                                placeholder="Search for a channel"
                                className="chat-dm-search" />
                        </div>
                        <p>Channels you can join</p>
                        {index}
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

export default ChatJoinChannel;