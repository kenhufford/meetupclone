import React from "react";

class ChatDirectMessageInvite extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filtered: [],
            searchTerm: '',
            recent: [],
        };
    }

    render(){
        if (this.props.show){
            let recentDMs = Object.values(this.props.userChannelList).map(channel =>{
                <li>
                    {channel.name}
                </li>
            })
            let groupUsers = Object.values(this.props.groupUsers).map(user => {
                <li>
                    {user.name}
                </li>
            })
            return (
                <div className="modal">
                    <div className="actions">
                        <i onClick={this.props.closeModal} className="fas fa-times"></i>
                    </div>
                    <div className="content">
                        <div>
                            <p>Direct Messages</p>
                            <input type="text" name="" id=""/>
                            <div>
                                <p>Recent Conversations</p>
                                <ul className="chat-recent-dms">
                                    {recentDMs}
                                </ul>
                                <ul>
                                    {groupUsers}
                                </ul>
                            </div>
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

export default ChatDirectMessageInvite;