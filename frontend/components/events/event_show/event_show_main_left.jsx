import React from 'react';

const EventShowMainLeft = props =>{
    const {description, reservations, imageUrl, users} = props;
    return (
        <div className="event-show-main-left">
            <img src={window[imageUrl]} alt="event-pic" />
            <div>
                <p className="event-show-description">
                    {description}
                </p>
            </div>
            <div className="event-show-main-left-members">
                <div >
                    Challengers ({reservations.eventReservations.length})
                                </div>
            </div>
            <div className="event-show-main-left-members-list">
                {reservations.eventReservations.map((reservation, i) => {
                    if (i < 12) {
                        return(
                            <div className="event-show-member-picture-div" key={i}>
                                <img key={i} src={window[users[reservation.userId].imageUrl]} alt="member-pic" className="event-show-member-picture" />
                                <p>{users[reservation.userId].name}</p>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default EventShowMainLeft;