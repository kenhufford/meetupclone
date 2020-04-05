import React from 'react';
import {formatDate} from '../../../utils/date_util';
import {Link, Redirect} from 'react-router-dom';
import EventShowBanner from './event_show_banner';
import EventShowMainLeft from './event_show_main_left';
import EventShowMainRight from './event_show_main_right';
import EventShowFooter from './event_show_footer';

class EventShow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            toEventIndex: false,
            currentUserAttending: false,
            loaded: false,
        }
        this.rsvp = this.rsvp.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this)
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
            } else if (this.props.reservations.eventReservations.length===1){
                this.props.deleteEvent(this.props.match.params.eventId)            
                    .then( () => {
                        this.setState({toEventIndex: true})
                    })
                this.props.history.push('/groups')
            } else {
                this.props.deleteReservation(this.props.match.params.eventId)            
                .then( () => this.setState({
                    currentUserAttending: false
                }))
            }
        }
    }

    deleteEvent(){
        if (!this.props.currentUser){
            document.location.href = '#/login'
        } else {
            this.setState({ loaded: false })
            this.props.deleteEvent(this.props.event.id)            
                .then( () => {
                    this.props.history.push('/groups')
                })
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
        if (this.state.toEventIndex === true) {
            return <Redirect to='/events' />
          }

        if(this.state.loaded){
            let {title, description, startTime, locationId, maxAttendance,
                endTime, address, imageUrl, id} = this.props.event
            let {group, locations, users, reservations, currentUserId} = this.props;
            let captains = [];
            let captainIds = [];
            let currentUserCaptain;
            reservations.eventReservations.forEach ( (reservation)=> {
                if (reservation.isOrganizer){
                    if (!users[reservation.userId]) return null
                    captains.push(users[reservation.userId].name)
                    captainIds.push(reservation.userId)
                    if (reservation.userId === currentUserId){
                        currentUserCaptain = true;
                    }
                }
            })
            let captainsText = captains.length===1 ? ` ` : `${captains[0]} and ${captains.length-1} others` 
            let joinButton;
            if (maxAttendance<=reservations.eventReservations.length){
                joinButton = (<button className="event-show-join">TOO LATE EVENT FULL</button>)
            } else if (!this.state.currentUserAttending){
                joinButton = (<button onClick={this.rsvp("create")} className="event-show-join">A NEW CHALLENGER</button>)
            } else if (this.state.currentUserAttending){
                joinButton = (<button onClick={this.rsvp("delete")} className="event-show-join">A HONORABLE RETREAT</button>)
            }
            
            let organizerOptions = currentUserCaptain ? (
                <div className="event-show-main-right-infobox">
                    <i className="far fa-compass"></i>
                    <div>
                        <p>Organizer Options</p>
                        <Link to={`/events/form/${id}/edit`}>Edit Event</Link>
                        <a onClick={this.deleteEvent}>Cancel the Brawl</a>
                    </div>
                </div>
            ) : (<div></div>)
            return(
                <div className="event-show">
                    <EventShowBanner
                        formatDate={formatDate}
                        captains={captains} 
                        captainsText={captainsText}
                        captainIds={captainIds}
                        startTime={startTime}
                        title={title}
                        users={users}
                        />
                    <div className="event-show-main">
                        <EventShowMainLeft
                            description={description}
                            reservations={reservations}
                            imageUrl={imageUrl}
                            users={users}
                            />
                        <EventShowMainRight
                            group={group}
                            startTime={startTime}
                            endTime={endTime}
                            address={address}
                            locationId={locationId}
                            locations={locations}
                            organizerOptions={organizerOptions}
                            />
                    </div>
                   <EventShowFooter
                    startTime={startTime}
                    title={title}
                    joinButton={joinButton}
                    />
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