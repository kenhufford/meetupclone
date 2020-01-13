import React from 'react';
import {formatDate, formatDateTime} from '../../utils/date_util'

class GroupShowEvents extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage: "All events"
        }
        this.switchPage = this.switchPage.bind(this);
    }

    switchPage(page){
        return () => {
        this.setState({
            currentPage: page
        })}
    }

    render(){
        let {events, group, locations, members} = this.props
        let list = this.state.currentPage==="All events" ? 
        (<ul className="group-show-members-right-list">
            {events.map ((event, i) => {
                let {imageUrl, title, startTime, description, reservations, address, locationId} = members[membership.userId]
                return (
                    <li key={i} className="group-show-members-right-member-li">
                        <div className="group-show-members-right-member">
                            <img src={window[imageUrl]} className="group-show-members-right-member-img"/>
                            <div className="group-show-members-right-member-info">
                                <p>{formatDateTime(startTime)}</p>
                                <p>{title}</p>
                                <p>{locations[locationId].name}</p>
                                <p>{reservations.length}</p>
                            </div>
                        </div>

                    </li>
                )
            })}
        </ul>) : 

        (<ul className="group-show-members-right-list">
            {organizerIds.map ((id, i) => {
                let {imageUrl, name, createdAt} = members[id]
                return (
                    <li key={i} className="group-show-members-right-member-li">
                        <div className="group-show-members-right-member">
                            <img src={window[imageUrl]} className="group-show-members-right-member-img"/>
                            <div  className="group-show-members-right-member-info">
                                <p>{name}</p>
                                <p>Joined on {formatDate(createdAt)}</p>
                            </div>
                        </div>

                    </li>
                )
            })}
        </ul>)

        return (
            
            <div className="group-show-members">
                <div className="group-show-members-left">
                    <div className="group-show-members-left-tab" onClick={this.switchPage("All members")}>
                        <p>All Members</p>
                        <p> {this.props.memberships.length}</p>
                    </div>
                    <div className="group-show-members-left-tab" onClick={this.switchPage("Leadership team")}>
                        <p>Leadership</p>
                        <p> {this.props.organizerIds.length}</p>
                    </div>
                </div>
                <div className="group-show-members-right">
                    <div className="group-show-members-right-header">
                        <p>{this.state.currentPage}</p>
                    </div>
                    <div className="group-show-members-right-search">
                        <input className="group-show-members-right-search-bar" type="text"/>
                    </div>
                    {list}
                </div>
            </div>

        )
    }
}

export default GroupShowEvents;