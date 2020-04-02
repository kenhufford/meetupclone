import React, {useState} from 'react';
import GroupIndexList from '../group_index_list';
import EventIndexListShort from '../../events/event_index_list_short';
import GroupLandingBanner from './group_landing_banner';
import GroupLandingIndex from './group_landing_index';
import useFetches from '../../hooks/use_fetches';

function GroupLanding(props){
    let [loaded, setLoaded] = useState(false);
    let [selectedLocation, setSelectedLocation] = useState("San Francisco");
    let [selectedLocationId, setSelectedLocationId] = useState(1);
    let selectLocation = (id) => {
        console.log(id)
        let location = props.locations[id-1];
        setSelectedLocation(location.name);
        setSelectedLocationId(location.id);
    }
    let { groups, events, locations, fetchGroups, fetchEvents, fetchLocations} = props;
    useFetches(setLoaded, fetchGroups, fetchEvents, fetchLocations);
    
    if (loaded){
        let nearbyGroups = Object.values(groups.allGroups)
            .filter(group => group.locationId === selectedLocationId)
        let nearbyEvents = Object.values(events.allEvents)
            .filter(event => event.locationId === selectedLocationId)
        return(
            <div className="landing">
                <GroupLandingBanner
                    />
                <div className="landing-main">
                    <GroupLandingIndex
                        indexName="Events"
                        selectedLocation={selectedLocation}
                        locations={locations}
                        selectLocation={selectLocation}
                        indexList={<EventIndexListShort events={nearbyEvents}/>}
                        />
                    <GroupLandingIndex
                        indexName="Groups"
                        selectedLocation={selectedLocation}
                        locations={locations}
                        selectLocation={selectLocation}
                        indexList={<GroupIndexList groups={nearbyGroups} />}
                        />
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default GroupLanding