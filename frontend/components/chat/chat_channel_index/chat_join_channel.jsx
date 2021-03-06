import React from "react";

class ChatJoinChannel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: '',
            filteredChannels: [],
            unjoinedGroups: []
        };
        this.update = this.update.bind(this);
        this.createChannelship = this.createChannelship.bind(this);
        this
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        let {groupChannels, myGroupChannels} = this.props;
        let unjoinedGroups = [];
        Object.values(groupChannels).forEach((channel) => {
            if (!myGroupChannels.includes(channel)) {
                unjoinedGroups.push(channel);
            }
        });
        this.setState({ unjoinedGroups });
    }

    componentDidUpdate(prevProps){
        let { myGroupChannels, groupChannels } = this.props;
        let unjoinedGroups = [];
        
        if(groupChannels === undefined) groupChannels = [];
        if (prevProps.myGroupChannels !== myGroupChannels){
            Object.values(groupChannels).forEach((channel) => {
                if (!myGroupChannels.includes(channel)) {
                    unjoinedGroups.push(channel);
                }
            });
            this.setState({ unjoinedGroups });
        }
        
    }

    update(e){
        let filteredChannels = this.state.unjoinedGroups.filter(channel =>
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
                if (this.state.unjoinedGroups.length === 0){
                    index = (<div className="chat-modal-msg">
                                <p className="chat-modal-medium">You've joined all the channels</p>
                            </div>)
                } else {
                    index = this.state.unjoinedGroups.map((channel, i) => (
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
                        <p className="chat-modal-medium">No channels found</p>
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
                        <p className="chat-modal-large">Browse Channels</p>
                        <div className="chat-dm-search-container">
                            <input
                                onChange={(e) => this.update(e)}
                                value={this.state.searchTerm}
                                placeholder="Search for a channel"
                                className="chat-dm-search" />
                        </div>
                        <p className="chat-modal-medium">Channels you can join</p>
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