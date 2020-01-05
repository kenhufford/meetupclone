import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <nav className="navbar-right">
      {/* Add "to" here later for new group */}
      <Link className="navbar-startgroup-link" to='/'>Start a New Group</Link> 
      <Link className="navbar-login-signup-link" to="/login">Log in</Link>
      <Link className="navbar-login-signup-link" to="/signup">Sign up</Link>
    </nav>
  );

  const signedIn = () => (
    <nav className="navbar-right">
      <a href="" className="navbar-group-link">Start a New Group</a>
      <a href="" className="navbar-explore-link">Explore</a>
      <a onClick={logout} className="navbar-dropdown">Logout</a>
    </nav>
  );

  return (
    <div className="navbar-header">
      <nav className="navbar-left">
        <img src="/images/meetup-logo.svg" alt="meetup-logo"/>  
      </nav>
      {currentUser ? signedIn() : sessionLinks()}
    </div>
  )
  
 
};


export default Header;
