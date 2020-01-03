import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <nav className="login-signup">
      {/* Add "to" here later for new group */}
      <Link to='/'>Start a New Group</Link> 
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up!</Link>
    </nav>
  );

  const signedIn = () => (
    <hgroup className="header-group">
      <h2 className="header-name">Hi, {currentUser.email}!</h2>
      <button className="header-button" onClick={logout}>Log Out</button>
    </hgroup>
  );

  return currentUser ? signedIn() : sessionLinks();
};


export default Header;
