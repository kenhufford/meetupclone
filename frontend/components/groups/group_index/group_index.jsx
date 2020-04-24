import React, {useState} from 'react';
import GroupIndexBox from './group_index_box';
import useFetches from '../../hooks/use_fetches';

const GroupIndex = (props) =>{
    const {groups, fetchGroups} = props;
    const [loaded, setLoaded] = useState(false);
    const [userPage, setUserPage] = useState(1);
    const [userLimit, setUserLimit] = useState(3);
    const [maxUserGroups, setMaxUserGroups] = useState(null);
    const [allPage, setAllPage] = useState(1);
    const [allLimit, setAllLimit] = useState(3);
    const [maxAllGroups, setMaxAllGroups] = useState(null);
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
    useFetches(setLoaded, [allPage, allLimit, userPage, userLimit],
        [fetchGroups,
            { allPage, allLimit, userPage, userLimit },
            { foo: setMaxAllGroups, key: "groups", key2: "allGroupsCount" },
            { foo: setMaxUserGroups, key: "groups", key2: "userGroupsCount" }]
    );
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
                    setLimit={setUserLimit}
                    limit={userLimit}
                /> : <div></div>}
                <GroupIndexBox
                    groups={allGroups}
                    title="ALL SQUADS"
                    switchPage={switchPage}
                    currentPage={allPage}
                    setLimit={setAllLimit}
                    max={Math.ceil(maxAllGroups / allLimit)}
                    limit={allLimit}
                    />
            </div>
            
        )
    } else {
        return (<div></div>)
    }   
}

export default GroupIndex