import React from "react";

const ChatGroupIndex = props => {
    let { selectedGroupId, selectGroup} = props;
    let groups = Object.values(props.groups.userGroups);
    let groupsList;
    if (groups.length !== 0){
        groupsList = groups.map((group) =>
                        (<div key={group.id} 
                            onClick={() => selectGroup(group)} 
                            className={group.id === selectedGroupId ? "chat-group-index-item-selected" : "chat-group-index-item"}>
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

export default ChatGroupIndex;