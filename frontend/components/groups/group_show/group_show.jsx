import React from 'react';
import GroupShowAbout from './group_show_about';
import GroupShowMembers from './group_show_members';
import GroupShowEvents from './group_show_events';
import GroupShowInfo from './group_show_info';
import GroupShowStripe from './group_show_stripe';
import GroupOptionsDropdown from './group_options_dropdown';
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

    componentDidMount(){
        const groupId = this.props.groupId;
        const fetchEventsFromGroup = this.props.fetchEventsFromGroup(groupId);
        const fetchLocations = this.props.fetchLocations();
        const fetchUsersFromGroup = this.props.fetchUsersFromGroup(groupId);
        const fetchMemberships = this.props.fetchMemberships(groupId);
        const fetchGroup = this.props.fetchGroup(groupId);  
        Promise.all([fetchLocations, fetchEventsFromGroup, fetchLocations, fetchUsersFromGroup, fetchMemberships, fetchGroup])
            .then( () => this.setState({loaded:true}))
    }

    componentDidUpdate(prevProps) {
        if (this.props.groupId !== prevProps.match.params.groupId) {
            this.props.fetchGroup(this.props.groupId)
        }
    }

    switchPage(page){
        return () => {
        this.setState({
            currentPage: page
        })}
    }

    render(){
        const {groupId, groups} = this.props;
        if (this.state.loaded && groupId in groups){
            let {locations, events, users, memberships, session, currentUser} = this.props;
            let group = groups[groupId]
            let {currentPage} = this.state;
            let currentUserMember = false;
            let currentUserCaptain;
            let captainIds = [];
            let squadLeaderIds = [];
            let memberIds = [];
            let currentTab;
            memberships.groupMemberships.map(membership => {
                memberIds.push(membership.userId);
                if (membership.memberType==="Captain") {
                    captainIds.push(membership.userId);
                } else if(membership.memberType==="Squad Leader"){
                    squadLeaderIds.push(membership.userId);
                }
                if (membership.userId===session.id){
                    currentUserMember = true;
                }
            })
            if (users[captainIds[0]]===undefined) return null
            let captainsNum = captainIds.length===1 ? ` ` : ` and ${captainIds.length-1} others` 
            if (typeof this.props.session === "undefined"){
                currentUserCaptain = false;
            } else {
                currentUserCaptain = captainIds.includes(this.props.session.id);
            }
            
            switch (this.state.currentPage) {
                    case "about":
                        currentTab = (<GroupShowAbout 
                                        switchPage={this.switchPage} 
                                        memberships={memberships.groupMemberships} 
                                        users={users} 
                                        captainsNum={captainsNum} 
                                        captainIds={captainIds} 
                                        group={group} 
                                        memberIds={memberIds}/>)
                        break;
                    case "members":
                        currentTab = <GroupShowMembers 
                                        currentUserCaptain={currentUserCaptain}
                                        captainIds={captainIds} 
                                        squadLeaderIds={squadLeaderIds}
                                        memberIds={memberIds}
                                        memberships={memberships.groupMemberships}
                                        users={users} 
                                        updateMembership={this.props.updateMembership}/>
                        break;
                    case "events":
                        currentTab = <GroupShowEvents 
                                        currentUserCaptain={currentUserCaptain} 
                                        events={events} 
                                        group={group} 
                                        locations={locations}
                                        groupId={group.id}/>
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
                <div className="group-show-div">
                    <GroupShowInfo 
                        locations={locations}
                        group={group}
                        memberIds={memberIds}
                        users={users}
                        captainIds={captainIds}
                        captainsNum={captainsNum} 
                        switchPage={this.switchPage}/>
                    <GroupShowStripe
                        groupDropdown={groupDropdown}
                        currentPage={currentPage}
                        switchPage={this.switchPage}
                        hasEvents={events.hasEvents} />
                    {currentTab}
                </div>
            )
        } else {    
            return (<div></div>)
        }
    }
}

export default GroupShow