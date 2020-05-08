import React, {useState, useEffect} from 'react';
import DashFilters from './dash_filters';
import Dash from './dash';
import useFetches from '../../hooks/use_fetches';
//compare stats
const DashBody = props => {
    const [selectedGroupId, setSelectedGroupId] = useState(undefined);
    const [selectedEventId, setSelectedEventId] = useState(undefined);
    const [selectedStat, setSelectedStat] = useState("Power");
    const [selectedFilter, setSelectedFilter] = useState(undefined);
    const [loaded, setLoaded] = useState(false);
    const { fetchEventsFromUser, fetchGroupsFromUser,
        fetchUsersFromGroup, fetchUsersFromEvent, currentUserId,
        userId, users, groups, events,tab} = props;
    let fetches = []
    if (selectedEventId) fetches.push([fetchUsersFromEvent, selectedEventId]);
    if (selectedGroupId) fetches.push([fetchUsersFromGroup, selectedGroupId]);
    useFetches(setLoaded, [selectedGroupId, selectedEventId, userId], ...fetches);
    useEffect( () => {
        setSelectedGroupId(undefined);
        setSelectedEventId(undefined);
        setSelectedFilter(undefined);
        setSelectedStat("Power");
    }, [tab])
    if(loaded){
        let cards = [];
        let title;
        let allGroups = "allGroups" in groups ? groups.allGroups : {}
        let userGroups = "userGroups" in groups ? groups.userGroups : {}
        let allEvents = "allEvents" in events ? events.allEvents : {}
        let groupsArray = allGroups !== undefined ? Object.values(allGroups) : [];
        let eventsArray = allEvents !== undefined ? Object.values(allEvents) : [];
        if(tab==="Compare Brawlers"){
            let groupName;
            if (selectedGroupId === undefined) groupName = "Filter by squad"
            else groupName = allGroups[selectedGroupId].name
            cards = [
                {userItems: groupsArray,
                selectedName: groupName,
                setSelectedId: setSelectedGroupId,
                setToUndefined: setSelectedEventId},
                {userItems: eventsArray,
                selectedName: selectedEventId !== undefined ? allEvents[selectedEventId].title : "Filter by brawl",
                setSelectedId: setSelectedEventId,
                setToUndefined: setSelectedGroupId},
                {userItems: 
                    [{ id: "Power", title: "Power" },
                    { id: "Speed", title: "Speed" },
                    { id: "Guts", title: "Guts" },
                    { id: "Technique", title: "Technique" },
                    { id: "Overall", title: "Overall" }],
                selectedName: selectedStat,
                setSelectedId: setSelectedStat}]
                title = "Select a squad or brawl to see the competition";
            if (selectedGroupId) title = `${selectedStat} ratings of brawlers in ${groupName}`;
            if (selectedEventId) title = `${selectedStat} ratings of brawlers in ${allEvents[selectedEventId].title}`;
        }else if(tab==="Compare Squads"){
            cards = [
                {userItems: 
                    [{ id: "Power", title: "Power" },
                    { id: "Speed", title: "Speed" },
                    { id: "Guts", title: "Guts" },
                    { id: "Technique", title: "Technique" },
                    { id: "Overall", title: "Overall" },
                    { id: "Total Members", title: "Total Members" }
                ],
                selectedName: selectedFilter || "Filter",
                setSelectedId: setSelectedFilter}]
            title = "Select a filter to compare squads";
            if (selectedFilter) title = `Squads compared by ${selectedFilter}`;
        }
        return (
            <div className="user-show-right-bottom">
                <DashFilters
                    cards={cards}
                    title={title}
                />
                <Dash
                    userId={userId}
                    groups={allGroups}
                    events={allEvents}
                    userGroups={userGroups}
                    user={users[userId]}
                    fetchUsersFromGroup={fetchUsersFromGroup}
                    fetchUsersFromEvent={fetchUsersFromEvent}
                    users={users}
                    selectedGroupId={selectedGroupId}
                    selectedEventId={selectedEventId}
                    selectedFilter={selectedFilter}
                    selectedStat={selectedStat}
                    setSelectedGroupId={setSelectedGroupId}
                    setSelectedEventId={setSelectedEventId}
                    currentUserId={currentUserId}
                    tab={tab}
                />
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default DashBody;