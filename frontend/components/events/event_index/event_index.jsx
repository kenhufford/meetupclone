import React, {useState} from 'react';
import EventIndexList from './event_index_list';
import useFetches from '../../hooks/use_fetches';

const EventIndex = props => {
    const [loaded, setLoaded] = useState(false);
    useFetches(setLoaded, [], props.fetchEvents, props.fetchLocations)

    if(loaded){
        const {locations, events} = props;
        let {userEvents, allEvents} = events;
        userEvents = userEvents === undefined ? [] : userEvents;
        return (
            <div className="index-div">
                {userEvents.length===0 ? 
                    <p className="index-div-titles-mid"></p> : 
                    <p className="index-div-titles-mid">
                        YOUR BRAWLS
                    </p>}
                <div className="group-show-events-main">
                    <EventIndexList
                        events={userEvents}
                        locations={locations}/>
                    <p className="index-div-titles-mid">
                        UPCOMING BRAWLS
                    </p>
                    <EventIndexList
                        events={allEvents}
                        locations={locations}/>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default EventIndex;