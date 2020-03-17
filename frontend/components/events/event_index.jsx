import React from 'react';
import EventIndexList from './event_index_list';

class EventIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            userBrawls: []
        }
        this.handleSignup = this.handleSignup.bind(this)
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
        const fetchLocations = this.props.fetchLocations();
        const fetchReservations = this.props.fetchReservations(0);
        Promise.all([fetchEvents, fetchReservations, fetchLocations])
            .then( (data) => {
                let events = data[0].events;
                let userBrawls = data[1].reservations.userReservations.map(reservation => {
                    return events[reservation.eventId]
                })
                this.setState({
                    loaded:true,
                    userBrawls,
                })
            })
        }

    render(){
        if(this.state.loaded){
            let {locations,events} = this.props;
            let {userBrawls} = this.state;
            return (
                <div className="index-div">
                    {userBrawls.length===0 ? 
                        <p className="index-div-titles-mid"></p> : 
                        <p className="index-div-titles-mid">
                            YOUR BRAWLS
                        </p>}
                    <div className="group-show-events-main">
                        <EventIndexList
                            events={userBrawls}
                            locations={locations}/>
                        <p className="index-div-titles-mid">UPCOMING BRAWLS</p>
                        <EventIndexList
                            events={events}
                            locations={locations}/>
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

export default EventIndex