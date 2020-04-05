import React, {useState} from 'react';
import GroupIndexList from '../group_index_list';
import EventIndexListShort from '../../events/event_index_list_short';
import GroupLandingBanner from './group_landing_banner';
import GroupLandingIndex from './group_landing_index';
import useFetches from '../../hooks/use_fetches';

const GroupLanding = props => {
    const [loaded, setLoaded] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("San Francisco");
    const [selectedLocationId, setSelectedLocationId] = useState(1);
    const selectLocation = (id) => {
        let location = props.locations[id-1];
        setSelectedLocation(location.name);
        setSelectedLocationId(location.id);
    }
    const { groups, events, locations, fetchGroups, fetchEvents, fetchLocations} = props;
    useFetches(setLoaded,[], fetchGroups, fetchEvents, fetchLocations);
    
    if (loaded){
        const nearbyGroups = Object.values(groups.allGroups)
            .filter(group => group.locationId === selectedLocationId)
        const nearbyEvents = Object.values(events.allEvents)
            .filter(event => event.locationId === selectedLocationId)
        return(
            <div className="landing">
                <GroupLandingBanner
                    />
                <div className="landing-main">
                    <GroupLandingIndex
                        indexName="Groups"
                        selectedLocation={selectedLocation}
                        locations={locations}
                        selectLocation={selectLocation}
                        indexList={<GroupIndexList groups={nearbyGroups} />}
                        />
                    <GroupLandingIndex
                        indexName="Events"
                        selectedLocation={selectedLocation}
                        locations={locations}
                        selectLocation={selectLocation}
                        indexList={<EventIndexListShort events={nearbyEvents}/>}
                        />
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default GroupLanding