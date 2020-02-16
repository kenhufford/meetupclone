
import React from "react";
import { Link } from 'react-router-dom';

class ChatInfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDropdown: false,
            channelUsers: this.props.channelUsers
        }
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(){
        let userDropdown = !this.state.userDropdown
        this.setState({
            userDropdown
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedChannel !== prevProps.selectedChannel ) {
            this.setState({
                channelUsers: this.props.channelUsers
            })
        }
    }

    render() {
        if (this.state.channelUsers === {}) return null;
        let channel = this.props.selectedChannel;
        let users = Object.values(this.state.channelUsers);
        let userDropdown = this.state.userDropdown ? (
            <div className="chat-info-dropdown">
                <div 
                    className="chat-info-bar-users">
                    <p>
                        <i className="far fa-user"></i>
                        {`${users.length} members`} 
                    </p>
                    <i className="fas fa-angle-down"
                        onClick={this.toggleDropdown}></i>
                </div>
                {users.map( user => (
                    <div key={user.id}
                        className="chat-info-bar-users-item">
                        <img src={window[user.imageUrl]}
                            className="chat-message-img">
                        </img>
                        <p> {user.name} </p>
                    </div>
                ))}
                {/* <div className="chat-info-bar-add">
                    <p>Add Member</p>
                </div> */}
            </div>
        ) : <div></div>
        let infobar = !channel ? 
            (<div className="chat-info-bar">
                    <p>Select a channel</p>
                </div>)
                :
            (<div className="chat-info-bar">
                <p>{channel.name}</p>
                {channel.eventId!==null ? <Link to={`/groups/${channel.groupId}/events/${channel.eventId}`}>Event Page</Link> : <div></div>}
                <div className="chat-info-bar-users"
                    onClick={this.toggleDropdown}>
                    <i className="fas fa-users"></i>
                    {users.length} 
                </div>
                
            </div> )

        if (this.props.loadInfoBar){
            return (
                <div className="chat-info-bar-wrapper">
                    {infobar}
                    {userDropdown}
                </div>
            )
        } else {
            return (
                <div >

                </div>
            )
        }
    }
}

export default ChatInfoBar;