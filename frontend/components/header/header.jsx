import React, {useState, useEffect} from 'react';
import HeaderLeft from './header_left';
import HeaderRight from './header_right';
import { withRouter } from "react-router";

const Header = props =>{
  const [userHasMemberships, setUserHasMemberships] = useState(false);
  const { currentUser, currentUserId, logout, fetchMemberships } = props;
  useEffect(() => {
    fetchMemberships(0)
      .then(data => {
        if(data.memberships.userHasMemberships) setUserHasMemberships(true);
        else setUserHasMemberships(false);
      })}, [props.currentUser])

  return (
    <div className="navbar-header">
      <HeaderLeft/>
      <HeaderRight
        currentUser={currentUser}
        currentUserId={currentUserId}
        logout={logout}
        userHasMemberships={userHasMemberships}/>
    </div>
  )
}


export default withRouter(Header);
