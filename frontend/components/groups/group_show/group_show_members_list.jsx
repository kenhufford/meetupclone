import React from 'react';
import { formatDate } from '../../../utils/date_util';

function GroupShowMembersList(props){
    let icons = {   "Initiate": "initiateURL", 
                    "Squad Leader": "squadleaderURL", 
                    "Captain": "captainURL" }
    let {users, ids, searchQuery, memberships} = props;
    return (
        <ul className="group-show-members-right-list">
            {memberships.map((membership) => {
                let id = membership.userId;
                let { imageUrl, name, createdAt } = users[id]
                if (ids.includes(id) && (searchQuery === '' || name.toLowerCase().includes(searchQuery.toLowerCase()))) {
                    return (
                        <li key={membership.id} className="group-show-members-right-member-li">
                            <div className="group-show-members-right-member">
                                <img src={window[imageUrl]} 
                                    className="group-show-members-right-member-img" />
                                <div className="group-show-members-right-member-info">
                                    <div className="group-show-members-right-member-info-left">
                                        <section>{name}</section>
                                        <p>Joined on {formatDate(createdAt)}</p>
                                    </div>
                                    <div className="group-show-members-right-member-info-right">
                                        <p>
                                            {membership.memberType}
                                        </p>
                                        <img className="group-show-member-picture-square" 
                                            src={window[icons[membership.memberType]]}/>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default GroupShowMembersList;