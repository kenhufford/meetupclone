import React from 'react';
import EventIndexItem from './event_index_item';

class EventIndexListShort extends React.Component {
    render() {
        let { events } = this.props;
        return (
            <div className="landing-groups-div">
                {events.map(event => (
                    <EventIndexItem
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
        )
    }
}

export default EventIndexListShort;