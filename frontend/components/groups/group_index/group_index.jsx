import React, {useState} from 'react';
import GroupIndexList from './group_index_list';
import GroupIndexBox from './group_index_box';
import useFetches from '../../hooks/use_fetches';
import {Link} from 'react-router-dom';

const GroupIndex = (props) =>{
    let {groups, fetchGroups} = props;
    let [loaded, setLoaded] = useState(false);
    let [userPage, setUserPage] = useState(1);
    let [userLimit, setUserLimit] = useState(3);
    let [maxUserGroups, setMaxUserGroups] = useState(null);
    let [allPage, setAllPage] = useState(1);
    let [allLimit, setAllLimit] = useState(3);
    let [maxAllGroups, setMaxAllGroups] = useState(null);
    useFetches(setLoaded, [allPage, userPage], 
        [fetchGroups, 
        {allPage, allLimit, userPage, userLimit},
        { foo: setMaxAllGroups, key:"groups", key2:"allGroupsCount"},
        { foo: setMaxUserGroups, key:"groups", key2:"userGroupsCount"}]
    );

    const switchPage = (dir, title) => {
        if (title === "ALL SQUADS"){
            let maxPage = Math.ceil(maxAllGroups / allLimit);
            if (dir === "back" && allPage > 1) setAllPage(allPage - 1);
            if (dir === "forward" && allPage < maxPage) setAllPage(allPage + 1);
            if (dir === "allBack") setAllPage(1);
            if (dir === "allForward" && allPage < maxPage) setAllPage(maxPage);
        } else {
            let maxPage = Math.ceil(maxUserGroups / userLimit);
            if (dir === "back" && userPage > 1) setUserPage(userPage - 1);
            if (dir === "forward" && userPage < maxPage) setUserPage(userPage + 1);
            if (dir === "allBack") setUserPage(1);
            if (dir === "allForward" && allPage < maxPage) setUserPage(maxPage);
        }
    }
    if(loaded){
        let allGroups = Object.values(groups.allGroups);
        let userGroups = groups.userGroups === undefined ? []: Object.values(groups.userGroups);
        return(
            <div className="component-index">
                {userGroups.length ? 
                <GroupIndexBox
                    groups={userGroups}
                    title="YOUR SQUADS"
                    switchPage={switchPage}
                    currentPage={userPage}
                    max={Math.ceil(maxUserGroups / userLimit)}
                /> : <div></div>}
                <GroupIndexBox
                    groups={allGroups}
                    title="ALL SQUADS"
                    switchPage={switchPage}
                    currentPage={allPage}
                    max={Math.ceil(maxAllGroups / userLimit)}
                    />
            </div>
            
        )
    } else {
        return (<div></div>)
    }   
}

export default GroupIndex