import React from 'react';
import EventIndexItem from './event_index_item';

const EventIndexListShort = props =>{
    const { events } = props;
    return (
        <div className="landing-groups-div">
            {events.map(event => (
                <EventIndexItem
                    key={`event${event.id}`}
                    event={event}
                />
            ))}
        </div>
    )
}

export default EventIndexListShort;