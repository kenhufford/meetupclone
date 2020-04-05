import React from 'react';

const EventShowBanner = props =>{
    const { title, formatDate, startTime, captainNames, captainIds, users} = props;
    const captainsText = captainNames.length === 1 ? ` ` : `${captainNames[0]} and ${captainNames.length - 1} others` 
    return (
        <div className="event-show-banner">
            <div className="event-show-banner-inter">
                <div className="event-show-banner-left">
                    <h3>{title}</h3>
                    <p>{formatDate(startTime)}</p>
                </div>
                <div className="event-show-banner-right">
                    <div className="event-show-banner-right-text">
                        <p>Brawl organized by</p>
                        <p>{captainNames[0]} {captainsText}</p>
                    </div>
                    <img src={window[users[captainIds[0]].imageUrl]}
                        className="event-show-member-picture"
                        alt="org-pic" />
                </div>
            </div>
        </div>
    )
}

export default EventShowBanner;