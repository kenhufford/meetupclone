import React from 'react';
import UserStatsBar from './user_stats_bar';

const UserStats = props => {
    const { users, userId, currentUserId, currentUser,createConnection, deleteConnection} = props;
    const {name, imageUrl, power, speed, guts, technique} = users[userId];
    const stats = [
        ["POWER",power, "red"],
        ["SPEED", speed, "blue"],
        ["GUTS", guts, "green"],
        ["TECHNIQUE",technique, "purple"]
    ];
    let addButton;
    if (userId in currentUser.activeRivals){
        addButton = <div onClick={()=> deleteConnection(userId)}
                        className="user-stats-rival">End Rivalry</div>
    } else if (userId in currentUser.pendingRivals){
        addButton = <div className="user-stats-rival">Pending</div>
    } else if (userId in currentUser.pendingChallengers){
        addButton = <div onClick={() => createConnection({ rival_id: userId })}
                        className="user-stats-rival">Accept Rivalry </div>
    } else {
        addButton = <div onClick={() => createConnection({ rival_id: userId })}
                        className="user-stats-rival">Start Rivalry</div>
    }
    return (
        <div className="user-stats">
            <img src={window[imageUrl]} 
                className="user-stats-image"/>
            <div className="user-stats-name-row">
                <p className="user-stats-name">
                    {name}
                </p>
                {(userId == currentUserId) ? <div></div> : addButton}
            </div>

            <ul className="user-stats-bars">
                {stats.map((stat,i) => 
                <UserStatsBar 
                    key={i}
                    stat={stat}
                    />)}
            </ul>
        </div>
    )
}

export default UserStats;