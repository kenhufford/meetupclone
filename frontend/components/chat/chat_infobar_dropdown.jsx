import React from 'react';
import onClickOutside from "react-onclickoutside";

class ChatInfoBarDropdown extends React.Component{
    constructor(props){
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside() {
        this.props.toggleDropdown(true);
    }

    render(){
        let users = Object.values(this.props.channelUsers);
        return (
            <div className="chat-info-dropdown">
                <div className="chat-info-bar-users">
                    <p>
                        <i className="far fa-user"></i>
                        {`${users.length} members`}
                    </p>
                    <i className="fas fa-angle-down"
                        onClick={() => this.props.toggleDropdown(true)}>
                    </i>
                </div>
                {users.map(user => (
                    <div key={user.id}
                        className="chat-info-bar-users-item">
                        <img src={window[user.imageUrl]}
                            className="chat-message-img">
                        </img>
                        <p>
                            {user.name}
                        </p>
                    </div>
                ))}
            </div>
            )
        }
}

export default onClickOutside(ChatInfoBarDropdown)