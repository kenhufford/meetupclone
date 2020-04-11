import React from 'react';
import SquadDashItem from './squads_dash_item';

const SquadsDash = props => {
    let {userGroups} = props.groups;
    let groups = Object.values(userGroups);
    return (
        <ul className="squads-dash">
            {groups.map( group => 
                <SquadDashItem
                    key={group.id}
                    group={group}
                    />
            )}
        </ul>
    )
}

export default SquadsDash;