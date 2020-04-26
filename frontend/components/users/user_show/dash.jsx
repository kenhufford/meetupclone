import React from 'react';
import Graph from './graph';

const Dash = props => {
    let { users,selectedEventId, selectedGroupId, selectedStat,
        setSelectedGroupId, setSelectedEventId, currentUserId} = props;
    if (selectedEventId || selectedGroupId) {
        let usersArray = Object.values(users);
        let data = usersArray.map(user => {
            let stat;
            switch (selectedStat) {
                case "Power":
                    stat= user.power
                    break;
                case "Speed":
                    stat= user.speed
                    break;
                case "Guts":
                    stat= user.guts
                    break;
                case "Technique":
                    stat= user.technique
                    break;
                default:
                    stat = user.power;
                    break;
            }
            return { x: user.name, y: stat, id:user.id}
        })
        return (
            <Graph
                data={data} 
                setSelectedGroupId={setSelectedGroupId}
                setSelectedEventId={setSelectedEventId}
                currentUserId={currentUserId}
                selectedStat={selectedStat}
                />
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Dash;