
import React from "react";
import ChatInfoBarDropDown from './chat_infobar_dropdown';
import { Link } from 'react-router-dom';

class ChatInfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDropdown: false,
        }
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(outsideClick){
        debugger
        let userDropdown = outsideClick ? false : !this.state.userDropdown
        this.setState({
            userDropdown
        })
    }

    render() {
        let channel = this.props.selectedChannel;
        let users = Object.values(this.props.channelUsers);
        let selectChannelBar = (<div className="chat-info-bar">
                                    <p>Select a channel</p>
                                </div>)
        let dropdown = <ChatInfoBarDropDown
            channelUsers={this.props.channelUsers}
            userDropdown={this.state.userDropdown}
            toggleDropdown={this.toggleDropdown}/>

        if (this.props.loadInfoBar){
            return (
                <div className="chat-info-bar-wrapper">
                    <div className="chat-info-bar">
                        <p>{channel.name}</p>
                        {channel.eventId !== null ? <Link to={`/groups/${channel.groupId}/events/${channel.eventId}`}>Event Page</Link> : <div></div>}
                        <div className="chat-info-bar-users"
                            onClick={() => this.toggleDropdown(false)}>
                            <i className="fas fa-users"></i>
                            {users.length}
                        </div>
                    </div>
                    {this.state.userDropdown && dropdown}
                </div>
            )
        } else {
            return (
                <div className="chat-info-bar-wrapper">
                    {selectChannelBar}
                </div>
            )
        }
    }
}

export default ChatInfoBar;