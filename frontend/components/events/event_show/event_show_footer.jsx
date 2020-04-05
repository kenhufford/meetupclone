import React from 'react';
import { formatDate } from '../../../utils/date_util';

const EventShowFooter = props => {
    const {startTime, title, joinButton} = props;
    return (
        <div className="event-show-footer">
            <div className="event-show-footer-inter">
                <div className="event-show-footer-left">
                    <p className="event-show-footer-left-title">
                        {title}
                    </p>
                    <p>
                        {formatDate(startTime)}
                    </p>
                </div>
                <div className="event-show-footer-right">
                    {joinButton}
                </div>
            </div>
        </div>
    )
}

export default EventShowFooter