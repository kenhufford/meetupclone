import React from 'react';

const UserStatsBar = props => {
    let {stat} = props;
    let [name, number, color] = stat;
    let bars = [];
    for(let i = 0; i < 5; i++){
        if (number>i*20) bars.push(<div key={i} className={`filled-${color}`}></div>)
        else bars.push(<div key={i} className="unfilled"></div>)
    }
    return(
        <div className="user-stats-bar">
            <div className="user-stats-bars-holder">
                <p className="user-stats-bar-name">{name}</p>
                <p className="user-stats-bar-name">{number}</p>
            </div>
            <div className="user-stats-bars-holder">
                {bars}
            </div>
        </div>
    )
}

export default UserStatsBar