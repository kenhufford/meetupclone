
import React from "react";

class ChatGroupIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let groups = Object.values(this.props.groups);
        let groupsList;
        if (groups.length !== 0){
            groupsList = groups.map((group, i) =>
                            (<li key={i} value={group.id} onClick={this.props.selectGroup}>
                                {group.name}
                            </li>)       )     
        } else {
            groupsList = <p>Join a group</p>
        }
        return (
            <div className="chat-group-index">
                Group index
                <ul>
                    {groupsList}
                </ul>
            </div>
        )
    }
}

export default ChatGroupIndex;