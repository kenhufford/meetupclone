import React, {useState} from 'react';
import GroupShowMembersLeft from './group_show_members_left';
import GroupShowMembersList from './group_show_members_list';

function GroupShowMembers(props){
    const [currentPage, setCurrentPage] = useState("All members")
    const [searchQuery, setSearchQuery] = useState('')
    const {users, squadLeaderIds, captainIds, memberIds, memberships} = props;
    const leaderIds = squadLeaderIds.concat(captainIds);
    const ids = currentPage === "All members" ? memberIds : leaderIds;
    return (
        <div className="group-show-members">
            <GroupShowMembersLeft 
                currentPage={currentPage}
                switchPage={(page) => setCurrentPage(page)}
                memberIds={memberIds}
                leaderIds={leaderIds}
                />
            <div className="group-show-members-right">
                <div className="group-show-members-right-header">
                    <p>{currentPage}</p>
                    <input type="text" 
                        className="group-show-filter-input"
                        placeholder="Search members"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    />
                </div>
                <GroupShowMembersList
                    currentPage={currentPage}
                    users={users}
                    ids={ids}
                    searchQuery={searchQuery}
                    memberships={memberships}/>
            </div>
        </div>
    )
}

export default GroupShowMembers;