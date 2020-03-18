import React, {useState, useEffect} from 'react';
import GroupIndexList from './group_index_list';
import useFetches from '../hooks/use_fetches';
import useFetchesSetData from '../hooks/use_fetches_set_data';
import {Link} from 'react-router-dom';

function GroupIndex(props){
    let [loaded1, setLoaded1] = useState(false);
    let [loaded2, setLoaded2] = useState(false);
    let [userGroups, setUserGroups] = useState([]);
    useFetches(setLoaded1, props.fetchGroups);
    useFetchesSetData(setLoaded2, setUserGroups, props.fetchGroupsFromUser, "groups", props.currentUserId);

    if(loaded1&&loaded2){
        let suggestedGroups = Object.values(props.groups);
        let yourTitle = !userGroups.length ?
            (<Link 
                className="index-div-titles"
                to={'/login'}>
                Join a squad
            </Link>) : 
            (<p 
                className="index-div-titles">
                Your Squads
            </p>)
        return(
            <div className="component-index">
                <div className="landing-main-groups">
                    {yourTitle}
                    <GroupIndexList 
                        groups={userGroups}/>
                </div>
                <div className="landing-main-groups">
                    <p className="index-div-titles">
                        All Squads
                    </p>
                    <GroupIndexList
                        groups={suggestedGroups}/>
                </div>
            </div>
            
        )
    } else {
        return (<div></div>)
    }   
}

export default GroupIndex