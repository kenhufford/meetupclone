import React, {useState} from 'react';
import GroupIndexBox  from '../group_index/group_index_box';
import CreateGroupFormDropdown from '../create_group/create_group_form_dropdown';
import GroupLandingBanner from './group_landing_banner';
import useFetches from '../../hooks/use_fetches';

const GroupLanding = props => {
    const [loaded, setLoaded] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("San Francisco");
    const [selectedLocationId, setSelectedLocationId] = useState(1);
    const [groupPage, setGroupPage] = useState(1);
    const [groupLimit, setGroupLimit] = useState(3);
    const [maxGroups, setMaxGroups] = useState(null);
    const switchPage = (dir, type) => {
        if (type === "allGroups") {
            let maxPage = Math.ceil(maxGroups / groupLimit);
            if (dir === "back" && groupPage > 1) setGroupPage(groupPage - 1);
            if (dir === "forward" && groupPage < maxPage) setGroupPage(groupPage + 1);
            if (dir === "allBack") setGroupPage(1);
            if (dir === "allForward" && groupPage < maxPage) setGroupPage(maxPage);
        }
    }
    const setLimit = (max, type) => {
        setGroupLimit(max);
        setGroupPage(1);
    }
    const selectLocation = (id) => {
        let location = props.locations[id-1];
        setSelectedLocation(location.name);
        setSelectedLocationId(location.id);
    }
    const { groups, locations, fetchGroups, fetchLocations} = props;
    useFetches(setLoaded,[selectedLocationId,groupPage,groupLimit], fetchLocations,
        [fetchGroups,
            { groupPage, groupLimit, userPage:1, userLimit:0, location_id: selectedLocationId},
            { foo: setMaxGroups, key: "groups", key2: "allGroupsCount" }]);
    
    if (loaded){
        const allGroups = groups.allGroups ? Object.values(groups.allGroups) : [];
        return(
            <div className="landing">
                <GroupLandingBanner
                    />
                <div className="landing-main">
                    <GroupIndexBox
                        type="allGroups"
                        items={allGroups}
                        title={`Groups in ${selectedLocation}`}
                        switchPage={switchPage}
                        currentPage={groupPage}
                        max={Math.ceil(maxGroups / groupLimit)}
                        limit={groupLimit}
                        setLimit={setLimit}
                        dropdown={<CreateGroupFormDropdown
                                    list={locations}
                                    toggleLocation={selectLocation} />}
                    />
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default GroupLanding