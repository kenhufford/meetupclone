import React, {useState} from 'react';
import DashFilters from './dash_filters';
import Dash from './dash';
import useFetches from '../../hooks/use_fetches';

const DashBody = props => {
    const [selectedGroupId, setSelectedGroupId] = useState(undefined);
    const [selectedEventId, setSelectedEventId] = useState(undefined);
    const [selectedStat, setSelectedStat] = useState("Power");
    const [loaded, setLoaded] = useState(false);
    const { fetchEventsFromUser, fetchGroupsFromUser,
        fetchUsersFromGroup, fetchUsersFromEvent, currentUserId,
        userId, users, groups, events,tab} = props;
    let fetches = [[fetchEventsFromUser, userId], [fetchGroupsFromUser, userId]]
    if (selectedEventId) fetches.push([fetchUsersFromEvent, selectedEventId]);
    if (selectedGroupId !== "Rivals" && selectedGroupId) fetches.push([fetchUsersFromGroup, selectedGroupId]);
    useFetches(setLoaded, [selectedGroupId, selectedEventId, userId], ...fetches);
    if(loaded){
        const hasRivals = Object.values(users[userId].activeRivals).length !== 0;
        let cards = [];
        let title;
        let allGroups = "allGroups" in groups ? groups.allGroups : {}
        let allEvents = "allEvents" in events ? events.allEvents : {}
        let groupsArray = allGroups !== undefined ? Object.values(allGroups) : [];
        let eventsArray = allEvents !== undefined ? Object.values(allEvents) : [];
        if(tab==="Compare Brawlers"){
            if (hasRivals) groupsArray.push({ id: "Rivals", title: "Rivals" });
            let groupName;
            if (selectedGroupId === "Rivals") groupName = "Rivals"
            else if (selectedGroupId === undefined) groupName = "Filter by squad"
            else groupName = allGroups[selectedGroupId].name
            cards = [
                {
                    userItems: groupsArray,
                    selectedName: groupName,
                    setSelectedId: setSelectedGroupId,
                    setToUndefined: setSelectedEventId
                },

                {
                    userItems: eventsArray,
                    selectedName: selectedEventId !== undefined ? allEvents[selectedEventId].title : "Filter by brawl",
                    setSelectedId: setSelectedEventId,
                    setToUndefined: setSelectedGroupId
                },

                {
                    userItems: [
                        { id: "Power", title: "Power" },
                        { id: "Speed", title: "Speed" },
                        { id: "Guts", title: "Guts" },
                        { id: "Technique", title: "Technique" }
                    ],
                    selectedName: selectedStat,
                    setSelectedId: setSelectedStat,
                },
            ]
            title = "Select a squad or brawl to see the competition";
            if (selectedGroupId) title = `${selectedStat} ratings of brawlers in ${groupName}`;
            if (selectedEventId) title = `${selectedStat} ratings of brawlers in ${allEvents[selectedEventId].title}`;
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
                    user={users[userId]}
                    fetchUsersFromGroup={fetchUsersFromGroup}
                    fetchUsersFromEvent={fetchUsersFromEvent}
                    users={users}
                    selectedGroupId={selectedGroupId}
                    selectedEventId={selectedEventId}
                    selectedStat={selectedStat}
                    setSelectedGroupId={setSelectedGroupId}
                    setSelectedEventId={setSelectedEventId}
                    currentUserId={currentUserId}
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