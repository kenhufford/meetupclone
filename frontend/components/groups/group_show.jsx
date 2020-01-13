import React from 'react';
import GroupShowAbout from './group_show_about'
import GroupShowMembers from './group_show_members'
import GroupOptionsDropdown from './group_options_dropdown'
import {Link} from 'react-router-dom'

class GroupShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage: "about"
        }
        this.switchPage = this.switchPage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.groupId !== prevProps.match.params.groupId) {
            this.props.fetchGroup(this.props.match.params.groupId)
        }
    }

    componentDidMount(){
        this.props.fetchLocations();
        this.props.fetchEvents();
        this.props.fetchGroup(this.props.match.params.groupId);  
    }

    switchPage(page){
        return () => {
        this.setState({
            currentPage: page
        })}
    }

    render(){
        debugger
        if (!this.props.group || !this.props.locations || !this.props.events) {
            return null
        } else {
            let {group, locations} = this.props
            let {memberships, members} = this.props.group
            let organizers = [];
            let organizerIds = [];
            memberships.forEach ( (member)=> {
                if (member.memberType==="Captain"){
                    organizers.push(members[member.userId].name)
                    organizerIds.push(member.userId)
                }
            })
            let organizersNum = organizers.length===1 ? ` ` : ` and ${organizers.length-1} others` 
            let {name} = this.props.group
            let currentUserOrganizer = organizerIds.includes(this.props.session.id)
            let currentUserMember = this.props.group.currentUserMember ? true : false
            let currentTab;
            switch (this.state.currentPage) {
                case "about":
                    currentTab = (<GroupShowAbout switchPage={this.switchPage} memberships={memberships} members={members} organizers={organizers} organizerIds={organizerIds} props={this.props} />)
                    break;
                    case "members":
                        currentTab = <GroupShowMembers organizerIds={organizerIds} members={members} memberships={memberships}/>
                        break;
                    case "events":
                        currentTab = <GroupShowEvents events={events} group={group}/>
                        break;
                    default:
                        currentTab = (<GroupShowAbout organizersNum={organizersNum} membership={memberships} members={members} organizers={organizers} organizerIds={organizerIds} props={this.props} />)
                        break;
            }
            let groupDropdown = (!this.props.group.members) ? (<div className="group-show-stripe-right"></div>) : 
            (  <div className="group-show-stripe-right">
                <GroupOptionsDropdown 
                createMembership={this.props.createMembership} 
                deleteMembership={this.props.deleteMembership} 
                deleteGroup={this.props.deleteGroup}
                currentUserMember={currentUserMember} 
                currentUserOrganizer={currentUserOrganizer}
                groupId={this.props.group.id}
                currentUserId= {this.props.session.id}
                totalMembers={this.props.group.memberships.length}/>
            </div>)
            return(
                <div>
                    <div className="group-show-div">
                        <div className="group-show-header">
                            <div className="group-show-header-left">
                            <img src={window[this.props.group.imageUrl]} alt="group-image" className="group-show-header-left-image"/>
                            </div>
                            <div className="group-show-header-right">
                                <h4 className="group-show-header-right-groupname">{name}</h4>
                                <div className="group-show-header-right-location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <p>{locations[this.props.group.locationId].name}</p>
                                </div>
                                <div className="group-show-header-right-totalmembers">
                                    <i className="fas fa-user-friends"></i>
                                    <p className="group-show-header-right-totalmembers-text">{memberships.length} members</p>
                                </div>
                                <div className="group-show-header-right-organized">
                                    <i className="fas fa-user"></i> 
                                    <p className="group-show-header-right-organized-text">Organized by {organizers[0]} {organizersNum}</p>
                                </div>
                            
                            </div>
                        </div>
                        
                        <div className="group-show-stripe">
                            <div className="group-show-stripe-left">
                                <li className="group-show-inline-list-item" onClick={this.switchPage('about')}>About</li>
                                <li className="group-show-inline-list-item" onClick={this.switchPage('events')}>Events</li>
                                <li className="group-show-inline-list-item" onClick={this.switchPage('members')}>Members</li>
                                <li className="group-show-inline-list-item">Photos</li>
                            </div>
                            {groupDropdown}
                        </div>
                        {currentTab}
                    </div>
            </div>
            )
        }        
    }
}

export default GroupShow