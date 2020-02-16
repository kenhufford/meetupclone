import React from 'react';
import GroupShowAbout from './group_show_about'
import GroupShowMembers from './group_show_members'
import GroupShowEvents from './group_show_events'
import GroupOptionsDropdown from './group_options_dropdown';
import {Link} from 'react-router-dom'
import { withRouter } from "react-router";

const GroupOptionsDropdownWithRouter = withRouter(GroupOptionsDropdown) 

class GroupShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage: "about",
            loaded: false
        }
        this.switchPage = this.switchPage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.groupId !== prevProps.match.params.groupId) {
            this.props.fetchGroup(this.props.match.params.groupId)
        }
    }

    componentDidMount(){
        let groupId = this.props.match.params.groupId;
        const fetchEventsFromGroup = this.props.fetchEventsFromGroup(groupId);
        const fetchLocations = this.props.fetchLocations();
        const fetchUsersFromGroup = this.props.fetchUsersFromGroup(groupId);
        const fetchMemberships = this.props.fetchMemberships(groupId);
        const fetchGroup = this.props.fetchGroup(groupId);  
        Promise.all([fetchLocations, fetchEventsFromGroup, fetchLocations, fetchUsersFromGroup, fetchMemberships, fetchGroup])
        .then( () => this.setState({loaded:true}))
    }

    switchPage(page){
        return () => {
        this.setState({
            currentPage: page
        })}
    }

    render(){
        if (this.state.loaded){
            let {group, locations, events, users, memberships, session, currentUser} = this.props
            let {name, locationId, imageUrl} = this.props.group
            let currentUserCaptain;
            let currentUserMember = false;
            let captainIds = [];
            let leaderIds = [];
            let memberIds = [];
            memberships.groupMemberships.map(membership => {
                memberIds.push(membership.userId)
                if (membership.memberType==="Captain") {
                    captainIds.push(membership.userId)
                    leaderIds.push(membership.userId)
                } else if(membership.memberType==="Squad Leader"){
                    leaderIds.push(membership.userId)
                }
                if (membership.userId===session.id){
                    currentUserMember = true
                }
            })
            
            if (users[captainIds[0]]===undefined) return null
            let captainsNum = captainIds.length===1 ? ` ` : ` and ${captainIds.length-1} others` 
            
            if (typeof this.props.session === "undefined"){
                currentUserCaptain = false    
            } else {
                currentUserCaptain = captainIds.includes(this.props.session.id)
            }
            
            let currentTab;
            let eventsArray = Object.values(events)
            switch (this.state.currentPage) {
                    case "about":
                        currentTab = (<GroupShowAbout switchPage={this.switchPage} memberships={memberships.groupMemberships} users={users} captainsNum={captainsNum} captainIds={captainIds} group={group} memberIds={memberIds}/>)
                        break;
                    case "members":
                        currentTab = <GroupShowMembers 
                                        currentUserCaptain={currentUserCaptain} 
                                        leaderIds={leaderIds}
                                        users={users} 
                                        memberships={memberships.groupMemberships}
                                        updateMembership={this.props.updateMembership}/>
                        break;
                    case "events":
                        currentTab = <GroupShowEvents 
                                        currentUserCaptain={currentUserCaptain} 
                                        events={eventsArray} 
                                        group={group} 
                                        locations={locations}
                                        groupId={group.id}/>
                        break;
                    default:
                        currentTab = (<GroupShowAbout 
                                        captainsNum={captainsNum} 
                                        membership={memberships} 
                                        users={users} 
                                        captains={captains} 
                                        captainIds={captainIds} 
                                        props={this.props} />)
                        break;
            }
            let groupDropdown =  <GroupOptionsDropdownWithRouter 
                                    createMembership={this.props.createMembership} 
                                    deleteMembership={this.props.deleteMembership} 
                                    deleteGroup={this.props.deleteGroup}
                                    currentUserCaptain={currentUserCaptain} 
                                    currentUserMember={currentUserMember} 
                                    groupId={group.id}
                                    currentUser= {currentUser}
                                    totalMembers={memberIds.length}
                                />
            return(
                <div>
                    <div className="group-show-div">
                        <div className="group-show-header">
                            <div className="group-show-header-left">
                            <img src={window[imageUrl]} alt="group-image" className="group-show-header-left-image"/>
                            </div>
                            <div className="group-show-header-right">
                                <h4 className="group-show-header-right-groupname">{name}</h4>
                                <div className="group-show-header-right-location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <Link to={`/search/?location%20${locationId}`}>{locations[locationId].name}</Link>
                                </div>
                                <div className="group-show-header-right-totalmembers">
                                    <i className="fas fa-user-friends"></i>
                                    <p className="group-show-header-right-totalmembers-text">{memberIds.length} members</p>
                                </div>
                                <div className="group-show-header-right-organized">
                                    <i className="fas fa-user"></i> 
                                    <p className="group-show-header-right-organized-text">Organized by {users[captainIds[0]].name} {captainsNum}</p>
                                </div>
                            
                            </div>
                        </div>
                        
                        <div className="group-show-stripe">
                            <div className="group-show-stripe-left">
                                <li className={this.state.currentPage === "about" ? "group-show-inline-list-item-selected" : "group-show-inline-list-item" }
                                    onClick={this.switchPage('about')}>About</li>
                                <li className={this.state.currentPage === "events" ? "group-show-inline-list-item-selected" : "group-show-inline-list-item" }
                                    onClick={this.switchPage('events')}>Brawls</li>
                                <li className={this.state.currentPage === "members" ? "group-show-inline-list-item-selected" : "group-show-inline-list-item" }
                                    onClick={this.switchPage('members')}>Members</li>
                            {groupDropdown}
                            </div>
                        </div>
                        {currentTab}
                    </div>
            </div> 
            )
        } else {    
            return (<div></div>)
        }
    }
}

export default GroupShow