
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
        let userDropdown = outsideClick ? false : !this.state.userDropdown
        this.setState({
            userDropdown
        })
    }

    render() {
        let {selectedChannel, channelUsers} = this.props;
        let users = Object.values(channelUsers);

        if (this.props.loadInfoBar){
            return (
                <div className="chat-info-bar-wrapper">
                    <div className="chat-info-bar">
                        <p>{selectedChannel.name}</p>
                        {selectedChannel.eventId !== null ? <Link to={`/groups/${selectedChannel.groupId}/events/${selectedChannel.eventId}`}>Event Page</Link> : <div></div>}
                        <div className="chat-info-bar-users"
                            onClick={() => this.toggleDropdown(false)}>
                            <i className="fas fa-users"></i>
                            {users.length}
                        </div>
                    </div>
                    {this.state.userDropdown && <ChatInfoBarDropDown
                        channelUsers={channelUsers}
                        userDropdown={this.state.userDropdown}
                        toggleDropdown={this.toggleDropdown} />}
                </div>
            )
        } else {
            return (
                <div className="chat-info-bar-wrapper">
                    <div className="chat-info-bar">
                        <p>Select a channel</p>
                    </div>
                </div>
            )
        }
    }
}

export default ChatInfoBar;