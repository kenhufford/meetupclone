import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ currentUser, logout }) => {
  const goHome = ()=>{
    document.location.href = '#/'
  }

  const sessionLinks = () => (
    <nav className="navbar-right">
      <a href="#/groups" className="navbar-explore-link">Explore</a>
      <Link className="navbar-login-signup-link" to="/login">Log in</Link>
      <Link className="navbar-login-signup-link" to="/signup">Sign up</Link>
    </nav>
  );

  const signedIn = () => (
    <nav className="navbar-right">
      <a href="#/groups/newform" className="navbar-group-link">Start a New Group</a>
      <a href="#/groups" className="navbar-explore-link">Explore</a>
      <Link onClick={logout} className="navbar-dropdown" to="/login">Logout</Link>
    </nav>
  );

  return (
    <div className="navbar-header">
      <nav className="navbar-left">
        <img className="navbar-logo" src={window.fightclubURL} onClick={goHome}/>
      </nav>
      {currentUser ? signedIn() : sessionLinks()}
    </div>
  )
  
 
};


export default Header;
