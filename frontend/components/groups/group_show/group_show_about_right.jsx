import React from 'react';
import AboutCaptainInfo from './about_captain_info';
import AboutMembersInfo from './about_members_info';

function GroupShowAboutRight(props){
    let {captainsNum, 
        captainIds, 
        memberIds, 
        users, 
        memberships, 
        switchPage} = props;
    return(
        <div className="group-show-main-right">
            <AboutCaptainInfo
                captainIds={captainIds}
                users={users}
                captainsNum={captainsNum} />
            <AboutMembersInfo
                users={users}
                memberships={memberships}
                memberIds={memberIds}
                switchPage={switchPage}
                />
        </div>
    )
}


export default GroupShowAboutRight;