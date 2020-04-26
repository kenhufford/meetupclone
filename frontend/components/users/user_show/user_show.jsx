import React, {useState, useEffect} from 'react';
import UserStats from './user_stats';
import useFetches from '../../hooks/use_fetches';
import DashFilters from './dash_filters';
import Dash from './dash';

const UserShow = props => {
    const { fetchUser, fetchEventsFromUser, fetchGroupsFromUser, 
        fetchUsersFromGroup, fetchUsersFromEvent, currentUserId,
        userId, users, groups, events} = props;
    const [loaded, setLoaded] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(undefined);
    const [selectedEventId, setSelectedEventId] = useState(undefined);
    const [selectedStat, setSelectedStat] = useState("Power");
    let fetches = [[fetchUser, userId], [fetchEventsFromUser, userId], [fetchGroupsFromUser, userId]]
    if (selectedEventId) fetches.push([fetchUsersFromEvent, selectedEventId]);
    if (selectedGroupId) fetches.push([fetchUsersFromGroup, selectedGroupId]);
    useFetches(setLoaded, [selectedGroupId, selectedEventId, userId], ...fetches);
    if(loaded && userId in users){
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
                            selectedStat={selectedStat}
                            setSelectedStat={setSelectedStat}
                            />
                        <Dash
                            userId={userId}
                            groups={groups.allGroups}
                            events={events.allEvents}
                            user={users[userId]}
                            fetchUsersFromGroup={fetchUsersFromGroup}
                            fetchUsersFromEvent={fetchUsersFromEvent}
                            users={users}
                            selectedGroupId={selectedGroupId}
                            selectedEventId={selectedEventId}
                            selectedStat={selectedStat}
                            setSelectedGroupId={setSelectedGroupId}
                            setSelectedEventId={setSelectedEventId}
                            currentUserId={currentUserId}
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