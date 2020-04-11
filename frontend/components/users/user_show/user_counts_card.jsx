import React from 'react';

const UserCountsCard = props => {
    let { title, icon, count} = props;
    return (
        <div className="user-counts-card">
            <div className="user-counts-card-left">
                <div>{count}</div>
                <div>{title}</div>
            </div>
            {icon}
        </div>
    )
}

export default UserCountsCard;