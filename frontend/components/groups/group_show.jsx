import React from 'react';
import {Link} from 'react-router-dom'

class GroupShow extends React.Component{
    constructor(props){
        super(props)
        this.handleJoin = this.handleJoin.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleJoin(){
        if (!this.props.session.id){
            document.location.href = '#/login'
        } else {
            this.props.createMembership(this.props.group.id)
        }

    }

    handleRemove(){
        if (!this.props.session.id){
            document.location.href = '#/login'
        } else {
            this.props.deleteMembership(this.props.group.id)
        }
    }

    componentDidMount(){
        this.props.fetchGroup(this.props.match.params.groupId);
        this.props.fetchLocations();
    }

    render(){
        console.log(this.props)
        if (!this.props.group || !this.props.group.members || !this.props.session || !this.props.locations) {
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
            let {name, description, imageUrl} = this.props.group
            let joinGroupButton = (!this.props.group.currentUserMember) ? 
                (<button className="group-show-join-button" onClick={this.handleJoin}>Join this Group</button>)
                : 
                (<button className="group-show-join-button" onClick={this.handleRemove}>Remove from Group</button>)
            let editGroupButton = (organizerIds.includes(this.props.session.id)) ? 
            (<Link className="group-show-edit-button" to={`/groups/${this.props.group.id}/edit`}>Edit Group</Link>)
            : 
            ( <div></div>)

            // console.log(this.props)
            console.log(this.props.group.locationId)
            console.log(this.props.locations)
            return(
                <div className="group-show-div">
                    <div className="group-show-header">
                        <div className="group-show-header-left">
                          <img src="" alt="group-image"/>
                        </div>
                        <div className="group-show-header-right">
                            <h4>{name}</h4>
                            <p>{memberships.length} members</p>
                            <p>Organized by {organizers[0]} {organizersNum}</p>
                            <p>{this.props.locations[this.props.group.locationId].name}</p>
                        </div>
                    </div>
                    <div className="group-show-stripe">
                        <div className="group-show-stripe-left">
                            <li className="group-show-inline-list-item">About</li>
                            <li className="group-show-inline-list-item">Events</li>
                            <li className="group-show-inline-list-item">Members</li>
                            <li className="group-show-inline-list-item">Photos</li>
                        </div>
                        <div className="group-show-stripe-right">
                            {joinGroupButton}
                            {editGroupButton}
                        </div>
                    </div>
                    <div className="group-show-main">
                        <div className="group-show-main-left">
                            <p className="group-show-stripe-left-header">What We're About</p>
                            <p className="group-show-stripe-left-description">{description}</p>
                        </div>
                        <div className="group-show-main-right">
                            <div className="group-show-main-right-organizers">
                                <p>Organizers</p>
                                <div className="group-show-main-right-organizers-info">
                                    <img alt="organizer-pic" className="group-show-organizer-picture"/>
                                    <p className="group-show-organizer-info-text">{organizers[0]} and {organizers.length} others</p>
                                </div>

                            </div>
                            <div className="group-show-main-right-members">
                                <p>Members ({memberships.length})</p>
                                <p>See All</p>
                            </div>
                            <div className="group-show-main-right-members-list">
                                    {memberships.map ( (member, i)=> {
                                        if (i < 12) {
                                       return  <p key={i} className="group-show-main-right-members-list-item">{membersObj[member.userId].name}</p>
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
                    
                </div>
            )
        }        
    }
}

export default GroupShow