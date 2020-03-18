import React from 'react';
import GroupIndexItem from './group_index_item';

function GroupIndexList(props){
    let { groups } = props;
    return (
        <div className="landing-groups-div">
            {groups.map(group => (
                <GroupIndexItem 
                    key={group.id}
                    group={group}
                    />
            ))}
        </div>
    )
}

export default GroupIndexList;