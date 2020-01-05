import React from 'react';
import GroupIndexItem from './group_index_item'
import {Link} from 'react-router-dom'

class GroupIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentItemIndex: 0
        };
    }

    componentDidMount(){
        if (this.props.currentUserId){
            this.props.fetchUser(this.props.currentUserId);
        }
        this.props.fetchAllGroups();
    }

    render(){
        let yourGroups = this.props.userGroupIds ? (
            <div className="groups-div">
                {this.props.userGroupIds.map( (membership) => (
                    <GroupIndexItem group={this.props.groups[membership.group_id]}/>
                ))}
            </div>
        ) :  (<div>Join a group!</div>)

        let suggestedGroups = (
            <div className="groups-div">
                {Object.values(this.props.groups).map( (group) => (
                    <GroupIndexItem group={group}/>
                ))}
            </div>
        )

        return(
            <div className="group-index-div">
                <p>YOUR GROUPS</p>
                {yourGroups}
                <p>SUGGESTED GROUPS</p>
                {suggestedGroups}
            </div>

        )
    }
}

export default GroupIndex