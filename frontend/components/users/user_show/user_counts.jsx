import React from 'react';
import UserCountsCard from './user_counts_card';

const UserCounts = props => {
    let {groupsCount, 
        eventsCount, 
        squadLeaderCount,
        captainCount, 
        initiateCount, 
        organizerCount, 
        rsvpCount} = props.user;
    let {groups, events} = props;
    let groupsIcon = <i className="fas fa-users card-icon"></i>
    let eventsIcon = <i className="fas fa-fist-raised card-icon"></i>
    let cards = [
        {title:"Squads Joined", 
            count: groupsCount, 
            icon: groupsIcon, 
            type:"groups", 
            userItems: groupsCount===0 ? []: Object.values(groups)},
        {title: "Brawls Attended", 
            count: eventsCount, 
            icon: eventsIcon, 
            type: "events", 
            userItems: eventsCount===0 ? []: Object.values(events)}
    ]
    return (
        <div className="user-counts">
            {cards.map((card,i) => 
                <UserCountsCard
                    key={i}
                    card={card}
                    />
            )}
        </div>
    )
}

export default UserCounts;