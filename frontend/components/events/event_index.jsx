import React from 'react';
import request from "superagent";
import debounce from "lodash.debounce";
import EventIndexItem from './event_index_item'
import {Link} from 'react-router-dom'

class EventIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            error: false,
            hasMore: true,
            isLoading: false,
            userEvents: [],
            allEvents: []
        }
        
    this.handleSignup = this.handleSignup.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)

    window.onscroll = debounce(() => {
        const {
            loadEvents,
            state: {
                error,
                isLoading,
                hasMore,
            },
        } = this;
        if (error || isLoading || !hasMore) return;
        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            loadEvents();
        }
    }, 100);
}

    handleSignup(){
        if (this.props.currentUserId === ""){
            document.location.href = '#/signup'
        } else {
            return null
        }
        
    }

    componentDidMount(){
        const fetchEvents = this.props.fetchEvents();
        const fetchGroups = this.props.fetchGroups();
        const fetchReservations = this.props.fetchReservations(0);
        Promise.all([fetchEvents, fetchGroups, fetchReservations])
            .then( (data) => {
                let userEvents = data[2].reservations.userReservations.map( (reservation) => (
                     data[0].events[reservation.id]));
                let allEvents = Object.values(data[0].events);
                this.setState({loaded:true});
            })
    }

    render(){
        if(this.state.loaded){
            let {events, reservations} = this.props;
            let yourEventsDiv;
            let {userReservations} = reservations;
            let allEvents = (
                <div className="groups-div">
                    {Object.values(events).map( (event) => (
                        <EventIndexItem key={event.id} event={event} />
                    ))}
                </div>
            )
                    
            yourEventsDiv = userReservations.length===0 ? 
                (<div className="index-signup">No brawls scheduled</div>) :
                (
                    <div className="events-div">
                        {userReservations.map( (reservation) => (
                            <EventIndexItem key={reservation.id} event={events[reservation.eventId]}/>
                        ))}
                    </div>
                ) 
            return (
                    <div className="index-div">
                        <div className="index-header">
                            <p className="index-div-titles">YOUR BRAWLS</p>
                            <div className="index-switch-div">
                                <div className="index-switch-not">
                                    <Link className="index-switch-text-not" to="/groups">SQUADS</Link>
                                </div>
                                <div className="index-switch-selected">
                                    <Link className="index-switch-text-selected" to="/events">BRAWLS</Link>
                                </div>                 
                                <div className="index-switch-not">
                                    <Link className="index-switch-text-not" to="/categories">STYLES</Link>
                                </div>            
                            </div>
                        </div>
                        {yourEventsDiv}
                        <p className="index-div-titles">ALL BRAWLS</p>
                        {allEvents}
                    </div>
            )
        } else {
            return (
                <div></div>
            )
        }
        
    }
        
}

export default EventIndex