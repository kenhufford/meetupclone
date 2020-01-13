import React from 'react';
import EventIndexItem from './event_index_item'
import {Link} from 'react-router-dom'

class EventIndex extends React.Component{
    constructor(props){
        super(props)
    this.handleSignup = this.handleSignup.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
}

    handleSignup(){
        if (this.props.currentUserId === ""){
            document.location.href = '#/signup'
        } else {
            return null
        }
        
    }

    componentDidMount(){
        this.props.fetchEvents();
        this.props.fetchGroups();
        this.props.fetchUser(this.props.currentUserId);
    }


    render(){
        let {events, currentUsersEventsIds, groups} = this.props
        let userEvents;
        let yourEventsDiv;
        if (!events || !groups) return null

        let suggestedEvents = (
            <div className="groups-div">
                {Object.values(events).map( (event) => (
                    <EventIndexItem key={event.id} event={event} groups={groups} />
                ))}
            </div>
        )


        if (currentUsersEventsIds){
            userEvents = [];
            currentUsersEventsIds.map(eventId => {
                userEvents.push(eventId)
            })

        yourEventsDiv = userEvents.length ? (
            <div className="events-div">
                {userEvents.map( (eventId) => (
                    <EventIndexItem key={eventId} event={this.props.events[eventId]}/>
                ))}
            </div>
        ) :  
        (<div className="index-signup">No brawls scheduled</div>)
        }

        return(
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
                    </div>
                </div>
                {yourEventsDiv}
                <p className="index-div-titles">ALL BRAWLS</p>
                {suggestedEvents}
            </div>

        )

    }
}

export default EventIndex