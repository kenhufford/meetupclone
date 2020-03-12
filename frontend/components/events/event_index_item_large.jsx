import React from 'react';
import { formatDate} from '../../utils/date_util';
import { Link } from 'react-router-dom';

class EventIndexItemLarge extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {brawl, diffMonth, thisMonth, locations, recurring} = this.props;
        const {id, startTime, title, locationId, reservationIds, groupId, imageUrl} = brawl;
        return(
            <div key={id}
                className="group-show-events-li-container">
                {diffMonth ? (<div className="group-show-event-datedivider">
                    {thisMonth}
                </div>) :
                    <div> </div>}
                <li className="group-show-events-li">

                    <div className="group-show-events-event-div">
                        <div className="group-show-events-event-div-top">
                            <p>{formatDate(startTime)}</p>
                        </div>
                        {recurring}
                        <div className="group-show-events-event-div-bottom">
                            <div className="group-show-events-event-info">
                                <span className="group-show-events-event-title">{title}</span>
                                <Link to={`/search/?location%20${locationId}`}>{locations[locationId].name}</Link>
                                <p>{reservationIds.length} challengers</p>
                            </div>
                            <div className="group-show-events-event-link">
                                <Link to={`/groups/${groupId}/events/${id}`} >
                                    <img src={window[imageUrl]} alt="event-img" className="group-show-events-img" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
    )}
}

export default EventIndexItemLarge;