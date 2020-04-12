import React, {useState} from 'react';
import UserStats from './user_stats';
import UserCounts from './user_counts';
import useFetches from '../../hooks/use_fetches';

const UserShow = props => {
    let { fetchUser, fetchEventsFromUser, fetchGroupsFromUser, userId, users, groups, events} = props;
    const [loaded, setLoaded] = useState(false);
    useFetches(setLoaded, [], [fetchUser, userId], [fetchEventsFromUser, userId], [fetchGroupsFromUser, userId]);
    if(loaded){
        return (
            <div>
                <div className="user-show">
                    <UserStats
                        user={users[userId]}
                    />
                    <div className="user-show-right">
                        <UserCounts
                            groups={groups.allGroups}
                            events={events.allEvents}
                            user={users[userId]}
                            />
                    </div>
                    <Graph/>
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