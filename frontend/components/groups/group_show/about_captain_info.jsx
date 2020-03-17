import React from 'react';

function AboutCaptainInfo(props){
    let {captainsNum, 
        captainIds, 
        users} = props;
    return(
        <div className="group-show-main-right-organizers">
            <p className="group-show-main-right-organizers-title">
                Captains
                    </p>
            <div className="group-show-main-right-organizers-info">
                <div className="group-show-member-picture-div">
                    <img src={window[users[captainIds[0]].imageUrl]}
                        alt="organizer-pic"
                        className="group-show-member-picture" />
                </div>
                <p className="group-show-organizer-info-text">
                    {users[captainIds[0]].name} {captainsNum}
                </p>
            </div>
        </div>
    )
}


export default AboutCaptainInfo;