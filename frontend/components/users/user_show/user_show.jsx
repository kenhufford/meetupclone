import React, {useState} from 'react';
import UserStats from './user_stats';
import useFetches from '../../hooks/use_fetches';
import DashFilters from './dash_filters';
import Dash from './dash';

const UserShow = props => {
    const { fetchUser, fetchEventsFromUser, fetchGroupsFromUser, fetchUsersFromGroup, fetchUsersFromEvent,
         userId, users, groups, events} = props;
    const [loaded, setLoaded] = useState(false);
    let [selectedGroupId, setSelectedGroupId] = useState(undefined);
    let [selectedEventId, setSelectedEventId] = useState(undefined);
    useFetches(setLoaded, [selectedGroupId, selectedEventId], [fetchUser, userId], [fetchEventsFromUser, userId], [fetchGroupsFromUser, userId]);
    if(loaded){
        return (
            <div>
                <div className="user-show">
                    <UserStats
                        user={users[userId]}
                    />
                    <div className="user-show-right">
                        <DashFilters
                            groups={groups.allGroups}
                            events={events.allEvents}
                            user={users[userId]}
                            selectedGroupId={selectedGroupId}
                            setSelectedGroupId={setSelectedGroupId}
                            selectedEventId={selectedEventId}
                            setSelectedEventId={setSelectedEventId}
                            />
                        <Dash
                            groups={groups.allGroups}
                            events={events.allEvents}
                            user={users[userId]}
                            fetchUsersFromGroup={fetchUsersFromGroup}
                            fetchUsersFromEvent={fetchUsersFromEvent}
                            users={users}
                            selectedGroupId={selectedGroupId}
                            selectedEventId={selectedEventId}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}

export default UserShow;