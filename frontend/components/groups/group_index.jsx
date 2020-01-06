import React from 'react';
import GroupIndexItem from './group_index_item'
import {Link} from 'react-router-dom'

class GroupIndex extends React.Component{
    constructor(props){
        super(props)

    }

    componentDidMount(){
        // if (this.props.currentUserId){
        //     this.props.fetchUser(this.props.currentUserId);
        //     let {currentUserLat, currentUserLong} = this.props
        //     let bounds = { bounds: {
        //                         northEast: { lat: currentUserLat + (0.072*20), long: currentUserLong - (0.072 * 20) },
        //                         southWest: { lat: currentUserLat - (0.072*20), long: currentUserLong + (0.072 * 20) },
        //     }}
        //     console.log(bounds)
        //     this.props.fetchGroups(bounds);
        // } else{
        //     this.props.fetchGroups();
        // }
        this.props.fetchGroups();
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
                <p>NEARBY GROUPS</p>
                {suggestedGroups}
            </div>

        )
    }
}

export default GroupIndex