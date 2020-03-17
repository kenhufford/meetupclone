import React from 'react';

function GroupShowMembersLeft(props){
    let {currentPage, switchPage, memberIds, leaderIds} = props;
    return (
        <div className="group-show-members-left">
            <div className="group-show-members-left-tab" 
                onClick={()=>switchPage("All members")}
                >
                <p className={currentPage === "All members" ? "group-show-members-selected" : "group-show-members-notselected"}>
                    All Members</p>
                <p className="group-show-members-length"> 
                    {memberIds.length}
                </p>
            </div>
            <div className="group-show-members-left-tab" 
                onClick={()=>switchPage("Leadership team")}
                >
                <p className={currentPage !== "All members" ? "group-show-members-selected" : "group-show-members-notselected"}>
                    Leadership
                </p>
                <p className="group-show-members-length">
                    {leaderIds.length}
                </p>
            </div>
        </div>
    )
}

export default GroupShowMembersLeft