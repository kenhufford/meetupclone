import React from 'react';
import Graph from './graph';

const Dash = props => {
    let { users,selectedEventId, selectedGroupId, selectedStat,tab,
        setSelectedGroupId, setSelectedEventId, currentUserId, 
        userId, groups, userGroups, events, selectedFilter} = props;
    let usersArray, selectedAverage, verticalData;
    let lineData = [], labelData = [];
    let limit = 100;
    if(tab==="Compare Brawlers"){
        if (!selectedEventId && !selectedGroupId) return <div></div>
        if (selectedEventId || selectedGroupId) {
            usersArray = Object.values(users);
        }
        if (selectedGroupId) {
            selectedAverage = groups[selectedGroupId].avgStats[selectedStat.toLowerCase()];
        } else if (selectedEventId) {
            selectedAverage = events[selectedEventId].avgStats[selectedStat.toLowerCase()];
        }
        verticalData = usersArray.map((user, i) => {
            if (user.name.length > 8) user.name = user.name.slice(0, 7) + (".")
            let stat = user[selectedStat.toLowerCase()]
            if (i === usersArray.length - 1) {
                labelData = [{ x: user.name, y: selectedAverage, label: `Average ${selectedStat}` }];
            }
            lineData.push({ x: user.name, y: selectedAverage })
            return { x: user.name, y: stat, id: user.id }
        })
    } else if (tab === "Compare Squads"){
        if (!selectedFilter) return <div></div>
        let squadsArray = Object.values(userGroups);
        let total = 0;
        let average;
        if (["Power", "Guts", "Technique", "Speed", "Overall"].includes(selectedFilter)) {
            squadsArray.forEach(squad => total += squad.avgStats[selectedFilter.toLowerCase()])
            average = total / squadsArray.length;
            verticalData = squadsArray.map((squad) => {
                if (squad.name.length > 8) squad.name = squad.name.slice(0, 7) + (".")
                lineData.push({ x: squad.name, y: average });
                return { x: squad.name, y: squad.avgStats[selectedFilter.toLowerCase()], id: squad.id };
            })
        } else if (selectedFilter = "Total Members") {
            squadsArray.forEach(squad => total += squad.membershipIds.length)
            average = total / squadsArray.length;
            verticalData = squadsArray.map((squad) => {
                if (squad.name.length > 8) squad.name = squad.name.slice(0, 7) + (".")
                lineData.push({ x: squad.name, y: average });
                limit = Math.max(0, squad.membershipIds.length)
                return { x: squad.name, y: squad.membershipIds.length, id: squad.id };
            })
        }
        labelData.push({ x: squadsArray[squadsArray.length - 1].name, y: average, label: `Average ${selectedFilter}` });
        console.log(limit)
    }
    
    return (
        <Graph
            verticalData={verticalData}
            lineData={lineData}
            labelData={labelData}
            setSelectedGroupId={setSelectedGroupId}
            setSelectedEventId={setSelectedEventId}
            currentUserId={currentUserId}
            selectedStat={selectedStat}
            limit={limit}
            tab={tab}
        />
    )
}

export default Dash;