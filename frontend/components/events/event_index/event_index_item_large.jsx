import React from 'react';
import { formatDate} from '../../../utils/date_util';
import { Link } from 'react-router-dom';

const EventIndexItemLarge = (props) => {
    const {brawl, diffMonth, thisMonth, locations, recurring} = props;
    const {id, startTime, title, locationId, reservationIds, groupId, imageUrl} = brawl;
    return(
        <div className="group-show-events-li-container">
            {diffMonth ? (
            <div className="group-show-event-datedivider">
                {thisMonth}
            </div>) :<div> </div>}
            <li className="group-show-events-li">
                <div className="group-show-events-event-div">
                    <div className="group-show-events-event-div-bottom">
                        <div className="group-show-events-event-info">
                            <span className="group-show-events-event-title">
                                {title}
                            </span>
                            <Link to={`/search/?location=${locationId}`}>
                                {locations[locationId].name}
                            </Link>
                            <p>
                                {formatDate(startTime)}
                            </p>
                            {recurring}
                            <p>
                                {reservationIds.length} challengers
                            </p>
                        </div>
                        <Link to={`/groups/${groupId}/events/${id}`} >
                            <img src={window[imageUrl]} 
                                className="group-show-events-img"/>
                        </Link>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default EventIndexItemLarge;