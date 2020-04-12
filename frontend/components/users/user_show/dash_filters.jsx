import React from 'react';
import DashFilterCard from './dash_filter_card';

const DashFilters = props => {
    let {groups, events, selectedGroupId, setSelectedGroupId, selectedEventId, setSelectedEventId } = props;
    let groupsArray = groups !== undefined ? Object.values(groups) : [];
    let eventsArray = events !== undefined ? Object.values(events) : [];
    let cards = [
        {userItems: groupsArray,
        selectedName: selectedGroupId !== undefined ? groups[selectedGroupId].name : "Filter by squad",
        setSelectedId: setSelectedGroupId,
        setToUndefined: setSelectedEventId
        },

        {userItems: eventsArray,
        selectedName: selectedEventId !== undefined  ? events[selectedEventId].title : "Filter by brawl",
        setSelectedId: setSelectedEventId,
        setToUndefined: setSelectedGroupId
        },
    ]
    return (
        <div className="user-counts">
            {cards.map((card,i) => 
                <DashFilterCard
                    key={i}
                    card={card}
                    />
            )}
        </div>
    )
}

export default DashFilters;