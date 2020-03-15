import React from 'react';
import GroupIndexItem from './group_index_item';

class GroupIndexList extends React.Component{
    render(){
        let { groups } = this.props;
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
}

export default GroupIndexList;