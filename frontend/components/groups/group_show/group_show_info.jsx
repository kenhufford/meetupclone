import React from 'react';
import { Link } from 'react-router-dom'

class GroupShowInfo extends React.Component{
    render(){
        let { locations, group, memberIds, users, captainIds, captainsNum, switchPage} = this.props;
        let { name, locationId, imageUrl } = group;
       return (
           <div className="group-show-header">
               <div className="group-show-header-left">
                   <img src={window[imageUrl]} alt="group-image" className="group-show-header-left-image" />
               </div>
               <div className="group-show-header-right">
                   <h4 className="group-show-header-right-groupname">{name}</h4>
                   <div className="group-show-header-right-location">
                       <i className="fas fa-map-marker-alt"></i>
                       <Link to={`/search/?location=${locationId}`}>{locations[locationId].name}</Link>
                   </div>
                   <div className="group-show-header-right-totalmembers">
                       <i className="fas fa-user-friends"></i>
                       <p className="group-show-header-right-totalmembers-text"
                           onClick={switchPage('members')}>{memberIds.length} members</p>
                   </div>
                   <div className="group-show-header-right-organized">
                       <i className="fas fa-user"></i>
                       <p className="group-show-header-right-organized-text">Organized by {users[captainIds[0]].name} {captainsNum}</p>
                   </div>

               </div>
           </div>
       ) 
    }
}


export default GroupShowInfo;