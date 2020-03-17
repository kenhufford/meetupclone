import React from 'react';
import { formatDate } from '../../../utils/date_util';

function GroupShowMembersListItem(props){
    let { user, icons, memberType} = props;
    let { imageUrl, name, createdAt } = user
    return (
        <li className="group-show-members-right-member-li">
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
                            {memberType}
                        </p>
                        <img className="group-show-member-picture-square"
                            src={window[icons[memberType]]} />
                    </div>
                </div>
            </div>
        </li>
    )
}

export default GroupShowMembersListItem;