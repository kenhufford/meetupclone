import React from 'react';
import { Link } from 'react-router-dom';

const AboutMembersInfo = props =>{
    let {memberIds, 
        memberships, 
        users,
        switchPage} = props;
    return(
        <React.Fragment>
            <div className="group-show-main-right-members">
                <div onClick={switchPage("members")}>
                    Members ({memberIds.length})
                    </div>
                <p onClick={switchPage("members")}>
                    See All
                    </p>
            </div>
            <div className="group-show-main-right-members-list">
                {memberships.map((membership,i) => {
                    if (i < 12) {
                        return <div className="group-show-member-picture-div" 
                                    key={membership.id} >
                                    <Link to={`/users/${membership.userId}`}>
                                        <img src={window[users[membership.userId].imageUrl]} 
                                            alt="member-pic" 
                                            className="group-show-member-picture" />
                                    </Link>
                                </div>
                    }
                })}
            </div>
        </React.Fragment>
    )
}


export default AboutMembersInfo;