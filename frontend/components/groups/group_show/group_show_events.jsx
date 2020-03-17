import React from 'react';
import {Link} from 'react-router-dom'
import EventIndexList from './event_index_list';

function GroupShowEvents(props){
    let { events, locations, currentUserCaptain, groupId } = props;
    return (
        <div className="group-show-events">
            <div className="group-show-events-main">
                {currentUserCaptain ? 
                (<Link to={`/events/new/${groupId}/`} 
                    className="group-show-create-event-button">
                    Create a Brawl
                </Link>) : <div></div>}
                <EventIndexList
                    events={events}
                    locations={locations}
                    />
            </div>
        </div>

    )
}

export default GroupShowEvents;