import React, {useState} from 'react';
import GroupIndexList from './group_index_list';
import useFetches from '../hooks/use_fetches';
import {Link} from 'react-router-dom';

function GroupIndex(props){
    let [loaded, setLoaded] = useState(false);
    useFetches(setLoaded, props.fetchGroups);

    if(loaded){
        let allGroups = Object.values(props.groups.allGroups);
        let userGroups = props.groups.userGroups === undefined ? []: Object.values(props.groups.userGroups);
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
                        groups={allGroups}/>
                </div>
            </div>
            
        )
    } else {
        return (<div></div>)
    }   
}

export default GroupIndex