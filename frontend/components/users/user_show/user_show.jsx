import React, {useState} from 'react';
import UserStats from './user_stats';
import useFetches from '../../hooks/use_fetches';
import DashFilters from './dash_filters';
import Dash from './dash';

const UserShow = props => {
    const { fetchUser, fetchEventsFromUser, fetchGroupsFromUser, 
        fetchUsersFromGroup, fetchUsersFromEvent, currentUserId,currentUser,
        userId, users, groups, events, createConnection, deleteConnection} = props;
    const [loaded, setLoaded] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(undefined);
    const [selectedEventId, setSelectedEventId] = useState(undefined);
    const [selectedStat, setSelectedStat] = useState("Power");
    let fetches = [[fetchUser, userId], [fetchEventsFromUser, userId], [fetchGroupsFromUser, userId]]
    if (selectedEventId) fetches.push([fetchUsersFromEvent, selectedEventId]);
    if (selectedGroupId !== "Rivals" && selectedGroupId) fetches.push([fetchUsersFromGroup, selectedGroupId]);
    useFetches(setLoaded, [selectedGroupId, selectedEventId, userId], ...fetches);
    if(loaded && userId in users){
    const hasRivals = Object.values(users[userId].activeRivals).length !== 0;
        return (
            <div>
                <div className="user-show">
                    <UserStats
                        users={users}
                        userId={userId}
                        currentUserId={currentUserId}
                        currentUser={currentUser}
                        createConnection={createConnection}
                        deleteConnection={deleteConnection}
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
                            hasRivals={hasRivals}
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