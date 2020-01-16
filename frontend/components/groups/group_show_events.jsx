import React from 'react';
import {formatDate, formatDateTime} from '../../utils/date_util'
import {Link} from 'react-router-dom'
class GroupShowEvents extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage: "All Scheduled Brawls"
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
        console.log(this.props)
        let {events, locations} = this.props
        let list = 
        (<ul className="group-show-events-list">
            {Object.keys(events).map ((eventId, i) => {
                let {title, description, locationId, groupId, imageUrl, startTime, endTime, address, reservationIds} = events[eventId]
                return (
                    <li key={i} className="group-show-events-li">
                        <div className="group-show-events-event-div">
                            <div className="group-show-events-event-info">
                                <span className="group-show-events-event-title">{title}</span>
                                <p>{formatDate(startTime)}</p>
                                <Link to={`/search/?location%20${locationId}`}>{locations[locationId].name}</Link>
                                <p>{reservationIds.length} challengers</p>
                            </div>
                            <div className="group-show-events-event-link">
                                <Link to={`/groups/${groupId}/events/${eventId}`} >
                                    <img src={window[imageUrl]} alt="event-img" className="group-show-events-img"/>
                                </Link>
                            </div>
                        </div>
                        <div className="group-show-events-info">
                            <p>{description}</p>
                        </div>
                    </li>
                )
            })}
        </ul>) 

        return (
            
            <div className="group-show-events">
                <div className="group-show-events-main">
                    <div className="group-show-events-header">
                        <p>{this.state.currentPage}</p>
                    </div>
                    {list}
                </div>
            </div>

        )
    }
}

export default GroupShowEvents;