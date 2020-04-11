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
    let groupsIcon = <i class="fas fa-users"></i>
    let cards = [
        {title:"Groups Joined", count: groupsCount, icon:groupsIcon}]
    return (
        <div className="user-counts">
            {cards.map(card => {
                <UserCountsCard
                    card={card}
                    />
            })}
        </div>
    )
}

export default UserCounts;