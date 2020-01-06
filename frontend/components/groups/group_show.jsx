import React from 'react';

class GroupShow extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchGroup(this.props.match.params.groupId)
    }

    render(){
        if (!this.props.group.members) return null
        let members = this.props.group.members ? this.props.group.members : []
        
        console.log(this.props)
        let {name, description, image_url, memberships} = this.props.group
        
        return(
            <div className="group-show-div">
                <div className="group-show-header">
                    <div className="group-show-header-left">
                      <img src="" alt="group-image"/>
                    </div>
                    <div className="group-show-header-right">
                        <h4>{name}</h4>
                        <p>{memberships.length} members</p>
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
                        <button className="group-show-join-button">Join this Group</button>
                    </div>
                </div>
                <div className="group-show-main">
                    <div className="group-show-main-left">
                        <p className="group-show-stripe-left-header">What We're About</p>
                        <p className="group-show-stripe-left-description">{description}</p>
                    </div>
                    <div className="group-show-main-right">
                        <div className="group-show-main-right-organizers">
                            Organizer
                        </div>
                        <div className="group-show-main-right-members">
                            <p>Members ({memberships.length})</p>
                            <p>See All</p>
                        </div>
                        <div className="group-show-main-right-members-list">
                                {this.props.group.members.map ( (member, i)=> {
                                    if (i < 12) {
                                   return  <p key={i} className="group-show-main-right-members-list-item">{member.name}</p>
                                    }
                                })}
                            </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default GroupShow