import React from 'react'

class GroupShowAbout extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if (!this.props.group){
            return null
        }
        let {group, captainsNum, captainIds, memberIds, users, memberships} = this.props
    
        return (
            <div className="group-show-main">
                        <div className="group-show-main-left">
                            <p className="group-show-stripe-left-header">What We're About</p>
                            <p className="group-show-stripe-left-description">{group.description}</p>
                        </div>
                        <div className="group-show-main-right">
                            <div className="group-show-main-right-organizers">
                                <p className="group-show-main-right-organizers-title">Captains</p>
                                <div className="group-show-main-right-organizers-info">
                                    <div className="group-show-member-picture-div">
                                        <img src={window[users[captainIds[0]].imageUrl]} alt="organizer-pic" className="group-show-member-picture"/> 
                                    </div>
                                    <p className="group-show-organizer-info-text">{users[captainIds[0]].name} {captainsNum}</p> 
                                </div>

                            </div>
                            <div className="group-show-main-right-members">
                                <div onClick={this.props.switchPage("members")}>
                                    Members ({memberIds.length})
                                </div>
                                <p onClick={this.props.switchPage("members")}>See All</p>
                            </div>
                            <div className="group-show-main-right-members-list">
                                    {memberships.map ( (member, i)=> {
                                        if (i < 12) {
                                            let icon = (
                                                <div className="group-show-member-picture-div" key={i} >
                                                    <img key={i} src={window[users[member.userId].imageUrl]} alt="member-pic" className="group-show-member-picture"/>
                                                </div>
                                            )
                                       return icon
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
        )
    }
}

export default GroupShowAbout