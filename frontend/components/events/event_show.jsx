import React from 'react';
import {formatDate, formatDateWithDay, formatTime} from '../../utils/date_util';
import {Link} from 'react-router-dom'
class EventShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentUserAttending: false
        }
        this.rsvp = this.rsvp.bind(this)
    }

    rsvp(key){
        return () => {
            if (!this.props.currentUserId){
                this.props.history.push(`/login`)
            } else if (key==="create"){
                this.props.createReservation(this.props.match.params.eventId)            
                .then(payload => this.setState({
                    currentUserAttending: payload.event.currentUserAttending
                }))
            } else {
                this.props.deleteReservation(this.props.match.params.eventId)            
                .then(payload => this.setState({
                    currentUserAttending: payload.event.currentUserAttending
                }))
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.eventId !== prevProps.match.params.eventId) {
            this.props.fetchEvent(this.props.match.params.eventId)
        }
    }

    componentDidMount(){
        this.props.fetchLocations();
        this.props.fetchUsers();
        this.props.fetchEvent(this.props.match.params.eventId)
            .then(payload => this.setState({
                currentUserAttending: payload.event.currentUserAttending
            }))  
        this.props.fetchGroup(this.props.match.params.groupId);  
    }

    render(){

        if (!this.props.event || !this.props.group || !this.props.locations ||!this.props.users) {
            return null
        } else {
            let {title, description, startTime, locationId,
                endTime, address, imageUrl, reservations} = this.props.event
            let {group, locations, users} = this.props;
            let organizers = [];
            let organizerIds = [];
            reservations.forEach ( (reservation)=> {
                if (reservation.isOrganizer){
                    organizers.push(users[reservation.userId].name)
                    organizerIds.push(reservation.userId)
                }
            })
            let organizersText = organizers.length===1 ? ` ` : `${organizers[0]} and ${organizers.length-1} others` 
            let joinButton = !this.state.currentUserAttending ? (<button onClick={this.rsvp("create")} className="event-show-join">A NEW CHALLENGER APPROACHES</button>) : 
            (<button onClick={this.rsvp("delete")} className="event-show-join">A HONORABLE RETREAT</button>)
            console.log(organizers)
            return(
                <div className="event-show">
                    <div className="event-show-banner">
                        <div className="event-show-banner-inter">
                            <div className="event-show-banner-left">
                                <h3>{title}</h3>
                                <p>{formatDate(startTime)}</p>
                            </div>  
                            <div className="event-show-banner-right">
                                <img src={window[users[organizerIds[0]].imageUrl]} 
                                className="event-show-member-picture"
                                alt="org-pic"/>
                                <div className="event-show-banner-right-text">
                                    <p>Brawl organized by</p>
                                    <p>{organizers[0]} {organizersText}</p>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className="event-show-main">
                        <div className="event-show-main-left">
                            <img src={window[imageUrl]} alt="event-pic"/>
                            <div>
                                <p className="event-show-description">{description}</p>
                            </div>
                            <div className="event-show-main-left-members">
                                <div >
                                    Challengers ({reservations.length})
                                </div>
                            </div>
                            <div className="event-show-main-left-members-list">
                                    {reservations.map ( (member, i)=> {
                                        if (i < 12) {
                                            let icon = (
                                                <div className="event-show-member-picture-div" key={i}>
                                                    <img key={i} src={window[users[member.userId].imageUrl]} alt="member-pic" className="event-show-member-picture"/>
                                                    <p>{users[member.userId].name}</p>
                                                    <p>{users[member.userId].isOrganizer ? "Organizer" : "Challenger"}</p>
                                                </div>
                                            )
                                       return icon
                                        }
                                    })}
                            </div>
                        </div>

                        <div className="event-show-main-right">
                            <div >
                                <Link to={`/groups/${group.id}`} className="event-show-main-right-groupinfo">
                                    <img src={window[group.imageUrl]}/>
                                    <p>
                                        Brawl Initiated By:
                                        <br/>
                                        {group.name} 
                                    </p>
                                </Link>
                            </div>
                            <div className="event-show-main-right-eventinfo">
                                <div className="event-show-main-right-infobox">
                                    <i className="far fa-clock"></i>
                                    <div>
                                        <p>{formatDateWithDay(startTime)}</p>
                                        <p>{formatTime(startTime) + " " + formatTime(endTime)}</p>
                                    </div>
                                </div>
                                <div className="event-show-main-right-infobox">
                                    <i className="far fa-compass"></i>
                                    <div>
                                        <p>{address}</p>
                                        <p>{locations[locationId].name}</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="event-show-footer">
                        <div className="event-show-footer-inter">
                            <div className="event-show-footer-left">
                                <p className="event-show-footer-left-title">{title}</p>
                                <p>{formatDate(startTime)}</p>
                            </div>  
                            <div className="event-show-footer-right">
                                {joinButton}
                            </div>  
                        </div>
                    </div>

                </div>
            )
        }
    }
}

export default EventShow