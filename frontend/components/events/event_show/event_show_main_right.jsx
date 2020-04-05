import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateWithDay } from '../../../utils/date_util';

const EventShowMainRight = props =>{
    const {group, startTime, endTime, address, locationId, locations, currentUserCaptain} = props;
    const organizerOptions = currentUserCaptain ? (
        <div className="event-show-main-right-infobox">
            <i className="far fa-compass"></i>
            <div>
                <p>Organizer Options</p>
                <Link to={`/events/form/${id}/edit`}>
                    Edit Event
                </Link>
                <a onClick={this.deleteEvent}>
                    Cancel the Brawl
                </a>
            </div>
        </div>
    ) : (<div></div>)
    return(
        <div className="event-show-main-right">
            <div >
                <Link to={`/groups/${group.id}`} 
                    className="event-show-main-right-groupinfo">
                    <img src={window[group.imageUrl]} />
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
                        <p>
                            {formatDateWithDay(startTime)} to
                        </p>
                        <p>
                            {formatDateWithDay(endTime)}
                        </p>
                    </div>
                </div>
                <div className="event-show-main-right-infobox">
                    <i className="far fa-compass"></i>
                    <div>
                        <p>{address}</p>
                        <Link className="event-show-main-right-infobox-link" 
                            to={`/search/?location%20${locationId}`}>
                            {locations[locationId].name}
                        </Link>
                    </div>
                </div>
                {organizerOptions}
            </div>
        </div>
    )
}

export default EventShowMainRight;