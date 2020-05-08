import React from 'react';
import Graph from './graph';

const Dash = props => {
    let { users,selectedEventId, selectedGroupId, selectedStat,
        setSelectedGroupId, setSelectedEventId, currentUserId, userId, groups, events} = props;
    let usersArray, selectedAverage;
    let lineData = [], labelData = [];
    
    if (!selectedEventId && !selectedGroupId){
        return (
            <div></div>
        )
    }
    if (selectedGroupId==="Rivals") {
        usersArray = Object.values(users[userId].activeRivals);
        usersArray.push(users[userId])
    } else if (selectedEventId || selectedGroupId) {
        usersArray = Object.values(users);
    }
    
    if (selectedGroupId) {
        selectedAverage = groups[selectedGroupId].avgStats[selectedStat.toLowerCase()];
    } else if (selectedEventId){
        selectedAverage = events[selectedEventId].avgStats[selectedStat.toLowerCase()];
    }
    let verticalData = usersArray.map((user,i) => {
        if (user.name.length > 8) user.name = user.name.slice(0,7)+(".")
        let stat;
        switch (selectedStat) {
            case "Power":
                stat = user.power
                break;
            case "Speed":
                stat = user.speed
                break;
            case "Guts":
                stat = user.guts
                break;
            case "Technique":
                stat = user.technique
                break;
            default:
                stat = user.power;
                break;
        }
        if(i===usersArray.length-1){
            labelData = [{ x: user.name, y: selectedAverage, label: `Average ${selectedStat}` }];
        }
        lineData.push({x:user.name, y:selectedAverage})
        return { x: user.name, y: stat, id: user.id }
    })
    return (
        <Graph
            verticalData={verticalData}
            lineData={lineData}
            labelData={labelData}
            setSelectedGroupId={setSelectedGroupId}
            setSelectedEventId={setSelectedEventId}
            currentUserId={currentUserId}
            selectedStat={selectedStat}
        />
    )
}

export default Dash;