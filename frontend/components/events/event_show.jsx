import React from 'react';
import {formatDate, formatDateWithDay, formatTime} from '../../utils/date_util';
import {Link} from 'react-router-dom'
class EventShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentUserAttending: false,
            loaded: false
        }
        this.rsvp = this.rsvp.bind(this)
    }

    rsvp(key){
        return () => {
            if (!this.props.currentUser){
                this.props.history.push(`/login`)
            } else if (key==="create"){
                this.props.createReservation(this.props.match.params.eventId)            
                .then( () => this.setState({
                    currentUserAttending: true
                }))
            } else {
                this.props.deleteReservation(this.props.match.params.eventId)            
                .then( () => this.setState({
                    currentUserAttending: false
                }))
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.eventId !== prevProps.match.params.eventId) {
            this.props.fetchEvent(this.props.match.params.eventId)
            this.props.fetchUsersFromEvent(this.props.match.params.eventId);
            this.props.fetchReservations(this.props.match.params.eventId);  
        }
    }

    componentDidMount(){
        let eventId = this.props.match.params.eventId;
        let groupId = this.props.match.params.groupId;
        const fetchLocations = this.props.fetchLocations();
        const fetchUsersFromEvent = this.props.fetchUsersFromEvent(eventId);
        const fetchEvent = this.props.fetchEvent(eventId)
            .then(payload => this.setState({
                currentUserAttending: payload.event.currentUserAttending
            }))  
        const fetchGroup = this.props.fetchGroup(groupId);  
        const fetchReservations = this.props.fetchReservations(eventId);  
        Promise.all([fetchLocations, fetchUsersFromEvent, fetchEvent, fetchGroup, fetchReservations])
        .then( () => this.setState({loaded:true}))
    }

    render(){
        if(this.state.loaded){
            let {title, description, startTime, locationId,
                endTime, address, imageUrl} = this.props.event
            let {group, locations, users, reservations} = this.props;
            let captains = [];
            let captainIds = [];
            reservations.eventReservations.forEach ( (reservation)=> {
                if (reservation.isOrganizer){
                    if (!users[reservation.userId]) return null
                    captains.push(users[reservation.userId].name)
                    captainIds.push(reservation.userId)
                }
            })
            let captainsText = captains.length===1 ? ` ` : `${captains[0]} and ${captains.length-1} others` 
            let joinButton = !this.state.currentUserAttending ? (<button onClick={this.rsvp("create")} className="event-show-join">A NEW CHALLENGER APPROACHES</button>) : 
            (<button onClick={this.rsvp("delete")} className="event-show-join">A HONORABLE RETREAT</button>)
            
            return(
                <div className="event-show">
                    <div className="event-show-banner">
                        <div className="event-show-banner-inter">
                            <div className="event-show-banner-left">
                                <h3>{title}</h3>
                                <p>{formatDate(startTime)}</p>
                            </div>  
                            <div className="event-show-banner-right">
                                <img src={window[users[captainIds[0]].imageUrl]} 
                                className="event-show-member-picture"
                                alt="org-pic"/>
                                <div className="event-show-banner-right-text">
                                    <p>Brawl organized by</p>
                                    <p>{captains[0]} {captainsText}</p>
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
                                    Challengers ({reservations.eventReservations.length})
                                </div>
                            </div>
                            <div className="event-show-main-left-members-list">
                                    {reservations.eventReservations.map ( (reservation, i)=> {
                                        if (i < 12) {
                                            let icon = (
                                                <div className="event-show-member-picture-div" key={i}>
                                                    <img key={i} src={window[users[reservation.userId].imageUrl]} alt="member-pic" className="event-show-member-picture"/>
                                                    <p>{users[reservation.userId].name}</p>
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
                                        <Link className="event-show-main-right-infobox-link" to={`/search/?location%20${locationId}`}>{locations[locationId].name}</Link>
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
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default EventShow