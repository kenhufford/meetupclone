
import React from "react";

class ChatInfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDropdown: false
        }
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(){
        let userDropdown = !this.state.userDropdown
        this.setState({
            userDropdown
        })
    }

    render() {
        let users = Object.values(this.props.channelUsers);
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
        let infobar = !this.props.selectedChannel ? 
            (<div className="chat-info-bar">
                    <p>Select a channel</p>
                </div>)
                :
            (<div className="chat-info-bar">
                <p>{this.props.selectedChannel.name}</p>
                
                <div className="chat-info-bar-users">
                    <i className="fas fa-users"
                        onClick={this.toggleDropdown}></i>
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