
import React from "react";

class ChatGroupIndex extends React.Component {
    render() {
        let groups = Object.values(this.props.groups);
        let groupsList;
        if (groups.length !== 0){
            groupsList = groups.map((group) =>
                            (<div key={group.id} 
                                onClick={() => this.props.selectGroup(group)} 
                                className="chat-group-index-item">
                                <img src={window[group.iconUrl]}/>
                            </div>)       )     
        } else {
            groupsList = <p>Join a group</p>
        }
        return (
            <div className="chat-group-index">
                <ul>
                    {groupsList}
                </ul>
            </div>
        )
    }
}

export default ChatGroupIndex;