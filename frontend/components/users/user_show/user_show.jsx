import React, {useState} from 'react';
import UserStats from './user_stats';
import DashTabs from './dash_tabs';
import useFetches from '../../hooks/use_fetches';
import DashBody from './dash_body';

const UserShow = props => {
    const { fetchUser, fetchEventsFromUser, fetchGroupsFromUser, 
        fetchUsersFromGroup, fetchUsersFromEvent, currentUserId,currentUser,
        userId, users, groups, events, createConnection, deleteConnection} = props;
    const [loaded, setLoaded] = useState(false);
    const [tab, setTab] = useState("Compare Brawlers");
    const fetches = [[fetchUser, userId], [fetchEventsFromUser, userId], [fetchGroups FromUser, userId]]
    // if(tab==="Compare Squads") fetches.push()
    useFetches(setLoaded, [userId], ...fetches);
    if(loaded && userId in users){
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
                        <DashTabs
                            setTab={setTab}
                            tab={tab}
                            />
                        <DashBody
                            fetchEventsFromUser={fetchEventsFromUser}
                            fetchGroupsFromUser={fetchGroupsFromUser}
                            fetchUsersFromGroup={fetchUsersFromGroup}
                            fetchUsersFromEvent={fetchUsersFromEvent}
                            currentUserId={currentUserId}
                            userId={userId}
                            users={users}
                            groups={groups}
                            events={events}
                            tab={tab}
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