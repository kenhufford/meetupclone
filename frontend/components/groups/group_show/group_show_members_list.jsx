import React from 'react';
import GroupShowMembersListItem from './group_show_members_list_item';

function GroupShowMembersList(props){
    let icons = {   "Initiate": "initiateURL", 
                    "Squad Leader": "squadleaderURL", 
                    "Captain": "captainURL" }
    let {users, ids, searchQuery, memberships} = props;
    return (
        <ul className="group-show-members-right-list">
            {memberships.map((membership) => {
                let id = membership.userId;
                let user = users[id];
                if (ids.includes(id) && (searchQuery === '' 
                    || user.name.toLowerCase().includes(searchQuery.toLowerCase()))){
                    return (
                        <GroupShowMembersListItem 
                            user={user}
                            memberType={membership.memberType}
                            icons={icons}
                            key={id}/>
                    )
                }
            })}
        </ul>
    )
}

export default GroupShowMembersList;