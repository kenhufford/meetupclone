import React, {useState} from 'react';
import UserStats from './user_stats';
import UserCounts from './user_counts';
import useFetches from '../../hooks/use_fetches';

const UserShow = props => {
    let { fetchUser, userId, users} = props;
    const [loaded, setLoaded] = useState(false);
    useFetches(setLoaded, [], [fetchUser, userId]);
    console.log(props)
    if(loaded){
        return (
            <div>
                <div className="user-show">
                    <UserStats
                        user={users[userId]}
                    />
                    <div className="user-show-right">
                        <UserCounts
                            user={users[userId]}
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