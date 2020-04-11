import React from 'react';
import {Link} from 'react-router-dom';

const SquadsDashItem = props => {
    let { group } = props;
    let {id, name, iconUrl} = group;
    return (
        <Link to={`/groups/${id}`}
            className="squads-dash-item">
            <img src={window[iconUrl]}
                className="squads-dash-icon"/>
            <p>{name}</p>
        </Link>
    )
}

export default SquadsDashItem;