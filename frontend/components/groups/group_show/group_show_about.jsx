import React from 'react';
import GroupShowAboutLeft from './group_show_about_left';
import GroupShowAboutRight from './group_show_about_right';

function GroupShowAbout(props){
    let {group, 
        captainsNum, 
        captainIds, 
        memberIds, 
        users, 
        memberships,
        switchPage} = props

    return (
        <div className="group-show-main">
            <GroupShowAboutLeft
                description={group.description}/>
            <GroupShowAboutRight
                captainsNum={captainsNum}
                captainIds={captainIds}
                memberIds={memberIds}
                users={users}
                memberships={memberships}
                switchPage={switchPage}/>
        </div>
    )
}

export default GroupShowAbout