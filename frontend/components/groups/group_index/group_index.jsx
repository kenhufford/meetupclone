import React, {useState} from 'react';
import IndexBox from './group_index_box';
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

    const switchPage = (dir, type) => {
        if (type === "allGroups"){
            let maxPage = Math.ceil(maxAllGroups / allLimit);
            if (dir === "back" && allPage > 1) setAllPage(allPage - 1);
            if (dir === "forward" && allPage < maxPage) setAllPage(allPage + 1);
            if (dir === "allBack") setAllPage(1);
            if (dir === "allForward" && allPage < maxPage) setAllPage(maxPage);
        } else if (type === "userGroups") {
            let maxPage = Math.ceil(maxUserGroups / userLimit);
            if (dir === "back" && userPage > 1) setUserPage(userPage - 1);
            if (dir === "forward" && userPage < maxPage) setUserPage(userPage + 1);
            if (dir === "allBack") setUserPage(1);
            if (dir === "allForward" && allPage < maxPage) setUserPage(maxPage);
        }
    }

    const setLimit = (max, type) => {
        if (type === "allGroups") {
            setAllLimit(max);
            setAllPage(1);
        } else {
            setUserLimit(max);
            setUserPage(1);
        }
    }

    useFetches(setLoaded, 
            [allPage, allLimit, userPage, userLimit],
            [fetchGroups,
            { allPage, allLimit, userPage, userLimit },
            { foo: setMaxAllGroups, key: "groups", key2: "allGroupsCount" },
            { foo: setMaxUserGroups, key: "groups", key2: "userGroupsCount" }]
    );

    if(loaded){
        let allGroups = Object.values(groups.allGroups);
        let userGroups  = groups.userGroups === undefined ? []: Object.values(groups.userGroups);
        return(
            <div className="component-index">
                {userGroups.length ? 
                <IndexBox
                    type="userGroups"
                    items={userGroups}
                    title="YOUR SQUADS"
                    switchPage={switchPage}
                    currentPage={userPage}
                    max={Math.ceil(maxUserGroups / userLimit)}
                    setLimit={setLimit}
                    limit={userLimit}
                /> : <div></div>}
                <IndexBox
                    type="allGroups"
                    items={allGroups}
                    title="ALL SQUADS"
                    switchPage={switchPage}
                    currentPage={allPage}
                    setLimit={setLimit}
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