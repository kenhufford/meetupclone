import React from 'react';
import DropdownLinks from '../../dropdown_links';

const UserCountsCard = props => {
    let { title, icon, count, type, userItems} = props.card;
    let card =  <div className="user-counts-card-left">
                    <div className="user-counts-card-count">{count}</div>
                    <div className="user-counts-card-title">{title}</div>
                </div>
    let links = userItems.map(item => `/${type}/${item.id}`)
    return (
        <div className="user-counts-card">
            <DropdownLinks
                title={card}
                links={links}
                />
            {icon}
        </div>
    )
}

export default UserCountsCard;