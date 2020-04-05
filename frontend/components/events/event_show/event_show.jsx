import React, {useState, useEffect} from 'react';
import {formatDate} from '../../../utils/date_util';
import EventShowBanner from './event_show_banner';
import EventShowMainLeft from './event_show_main_left';
import EventShowMainRight from './event_show_main_right';
import EventShowFooter from './event_show_footer';
import useFetches from '../../hooks/use_fetches';

const EventShow = props =>{
    const [loaded, setLoaded] = useState(false);
    const [currentUserAttending, setCurrentUserAttending] = useState(false);
    const rsvp = (key) => {
        return () => {
            if (!props.currentUser){
                props.history.push(`/login`);
            } else if (key==="create"){
                props.createReservation(props.match.params.eventId)    
                    .then( () => setCurrentUserAttending(true));
            } else if (props.reservations.eventReservations.length===1){
                props.deleteEvent(props.match.params.eventId);
                props.history.push('/groups');
            } else {
                props.deleteReservation(props.match.params.eventId)            
                    .then(() => setCurrentUserAttending(false));
            }
        }
    }
    const deleteEvent = () =>{
        if (!props.currentUser){
            document.location.href = '#/login';
        } else {
            setLoaded(false);
            props.deleteEvent(props.event.id)            
                .then( () => {props.history.push('/groups')})
        }
    }
    const { eventId, groupId } = props.match.params;
    const fetchEvent = (eventId) => props.fetchEvent(eventId)
        .then(payload => setCurrentUserAttending(payload.event.currentUserAttending))
    const { fetchLocations, fetchUsersFromEvent, fetchGroup, fetchReservations } = props;

    useFetches(setLoaded,
        [props.match.params.eventId],
        fetchLocations,
        [fetchUsersFromEvent, eventId],
        [fetchEvent, eventId],
        [fetchGroup, groupId],
        [fetchReservations, eventId])

    if(loaded){
        const {title, description, startTime, locationId, maxAttendance,
            endTime, address, imageUrl} = props.event;
        const {group, locations, users, reservations, currentUserId} = props;
        const captainNames = [];
        const captainIds = [];
        let currentUserCaptain = false;
        reservations.eventReservations.forEach ( (reservation)=> {
            if (reservation.isOrganizer){
                if (!users[reservation.userId]) return null
                captainNames.push(users[reservation.userId].name)
                captainIds.push(reservation.userId)
                if (reservation.userId === currentUserId){
                    currentUserCaptain = true;
                }
            }
        })
        let joinButton;
        if (maxAttendance<=reservations.eventReservations.length){
            joinButton = (<button className="event-show-join">TOO LATE EVENT FULL</button>)
        } else if (!currentUserAttending){
            joinButton = (<button onClick={rsvp("create")} className="event-show-join">A NEW CHALLENGER</button>)
        } else if (currentUserAttending){
            joinButton = (<button onClick={rsvp("delete")} className="event-show-join">A HONORABLE RETREAT</button>)
        }
        
        return(
            <div className="event-show">
                <EventShowBanner
                    formatDate={formatDate}
                    captainNames={captainNames} 
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
                        currentUserCaptain={currentUserCaptain}
                        deleteEvent={deleteEvent}
                        id={eventId}
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

export default EventShow