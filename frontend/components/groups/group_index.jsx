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
        this.props.fetchCategories();
        this.props.fetchUser(this.props.currentUserId);
    }


    render(){
        if (!this.props.groups) return null

        let suggestedGroups = (
            <div className="groups-div">
                {Object.values(this.props.groups).map( (group) => (
                    <GroupIndexItem key={group.id} group={group}/>
                ))}
            </div>
        )

        let userGroups;
        let yourGroups;
        if (this.props.currentUsersGroups){
            userGroups = []
            this.props.currentUsersGroups.map(groupIdObj => {
                userGroups.push(groupIdObj["id"])
            })

            yourGroups = userGroups.length ? (
                <div className="groups-div">
                    {userGroups.map( (groupId) => (
                        <GroupIndexItem key={groupId} group={this.props.groups[groupId]}/>
                    ))}
                </div>
            ) :  (<div>Join a group!</div>)
        }

        return(
            <div className="groups-index-div">
                <p className="groups-index-div-titles">YOUR GROUPS</p>
                {yourGroups}
                <p className="groups-index-div-titles">NEARBY GROUPS</p>
                {suggestedGroups}
            </div>

        )

    }
}

export default GroupIndex