import React from 'react';
import {Link} from 'react-router-dom'
import GroupShowAbout from './group_show_about'
import GroupShowMembers from './group_show_members'
import GroupOptionsDropdown from './group_options_dropdown'

class GroupShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage: "about"
        }
        this.switchPage = this.switchPage.bind(this);
    }

    componentDidMount(){
        const fetchGroup = this.props.fetchGroup(this.props.match.params.groupId);
        const fetchLocations = this.props.fetchLocations();
      
        Promise.all([ fetchGroup, fetchLocations ]).then(() => {
            this.forceUpdate()
        });
    
    }

    switchPage(page){
        return () => {
        this.setState({
            currentPage: page
        })}
    }

    render(){
        if (!this.props.group || !this.props.group.members || !this.props.locations) {
            return null
        } else {
            let memberships = (!this.props.group.memberships) ? [] : this.props.group.memberships 
            let membersObj = (this.props.group.members)
            let organizers = [];
            let organizerIds = [];
                memberships.forEach ( (member)=> {
                    if (member.memberType==="Organizer"){
                        organizers.push(membersObj[member.userId].name)
                        organizerIds.push(member.userId)
                    }
                })
            let organizersNum = organizers.length===1 ? ` ` : ` and ${organizers.length-1} others` 
            let {name} = this.props.group
            let currentUserOrganizer = organizerIds.includes(this.props.session.id)
            let currentUserMember = this.props.group.currentUserMember
            let currentTab;
            // console.log(currentUserOrganizer)
            console.log(currentUserMember)
            
            switch (this.state.currentPage) {
                case "about":
                    currentTab = (<GroupShowAbout switchPage={this.switchPage} memberships={memberships} membersObj={membersObj} organizers={organizers} organizerIds={organizerIds} props={this.props} />)
                    break;
                    case "members":
                        currentTab = <GroupShowMembers organizerIds={organizerIds} membersObj={membersObj} memberships={memberships}/>
                        break;
                    default:
                        currentTab = (<GroupShowAbout organizersNum={organizersNum} membership={memberships} membersObj={membersObj} organizers={organizers} organizerIds={organizerIds} props={this.props} />)
                        break;
            }
            
            return(

                <div className="group-show-div">
                    <div className="group-show-header">
                        <div className="group-show-header-left">
                          <img src={window[this.props.group.imageUrl]} alt="group-image" className="group-show-header-left-image"/>
                        </div>
                        <div className="group-show-header-right">
                            <h4 className="group-show-header-right-groupname">{name}</h4>
                            <div className="group-show-header-right-location">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>{this.props.locations[this.props.group.locationId].name}</p>
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
                            <li className="group-show-inline-list-item">Events</li>
                            <li className="group-show-inline-list-item" onClick={this.switchPage('members')}>Members</li>
                            <li className="group-show-inline-list-item">Photos</li>
                        </div>
                        <div className="group-show-stripe-right">
                            <GroupOptionsDropdown 
                            createMembership={this.props.createMembership} 
                            deleteMembership={this.props.deleteMembership} 
                            deleteGroup={this.props.deleteGroup}
                            currentUserMember={currentUserMember} 
                            currentUserOrganizer={currentUserOrganizer}
                            groupId={this.props.group.id}
                            currentUserId= {this.props.session.id}
                            totalMembers={this.props.group.memberships.length}/>
                        </div>
                    </div>
                    {currentTab}

                    
                    
                </div>
            )
        }        
    }
}

export default GroupShow