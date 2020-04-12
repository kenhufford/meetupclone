import React, { useState } from 'react';
import Graph from './graph';
import useFetches from '../../hooks/use_fetches';

const Dash = props => {
    let { groups, events, user, users, fetchUsersFromGroup, fetchUsersFromEvent, selectedEventId, selectedGroupId} = props;
    if (selectedEventId || selectedGroupId) {
        let [loaded, setLoaded] = useState(false);
        let fetch;
        if (selectedEventId) fetch = [fetchUsersFromEvent, selectedEventId];
        if (selectedGroupId) fetch = [fetchUsersFromGroup, selectedGroupId];
        useFetches(setLoaded, [selectedGroupId, selectedEventId], fetch);
        if (loaded) {
            let usersArray = Object.values(users);
            let data = usersArray.map(user => {
                return { x: user.name, y: user.power }
            })
            return (
                <Graph
                    data={data} />
            )
        } else {
            return (
                <div></div>
            )
        }
    } else {
        return (
            <div></div>
        )
    }
}

export default Dash;