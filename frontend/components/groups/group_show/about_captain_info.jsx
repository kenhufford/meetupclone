import React from 'react';
import { Link } from 'react-router-dom';

const AboutCaptainInfo = props =>{
    const {captainsNum, captainIds, users} = props;
    return(
        <div className="group-show-main-right-organizers">
            <p className="group-show-main-right-organizers-title">
                Captains
                    </p>
            <div className="group-show-main-right-organizers-info">
                <Link to={`/users/${captainIds[0]}`}>
                    <img src={window[users[captainIds[0]].imageUrl]}
                        alt="organizer-pic"
                        className="group-show-member-picture" />
                </Link>
                <p className="group-show-organizer-info-text">
                    {users[captainIds[0]].name} {captainsNum}
                </p>
            </div>
        </div>
    )
}


export default AboutCaptainInfo;