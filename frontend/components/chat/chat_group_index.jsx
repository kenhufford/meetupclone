
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
                            (<div key={i} 
                                value={group.id} 
                                onClick={(e) => this.props.selectGroup(e)} 
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