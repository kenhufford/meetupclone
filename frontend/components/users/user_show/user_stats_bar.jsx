import React from 'react';

const UserStatsBar = props => {
    let {stat} = props;
    let [name, number] = stat;
    let bars = [];
    for(let i = 0; i < 5; i++){
        if (i < number) bars.push(<div key={i} className="filled"></div>)
        else bars.push(<div key={i} className="unfilled"></div>)
    }
    return(
        <div className="user-stats-bar">
            <p className="user-stats-bar-name">{name}</p>
            <div className="user-stats-bars-holder">
                {bars}
            </div>
            
        </div>
    )
}

export default UserStatsBar