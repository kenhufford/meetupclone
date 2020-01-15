import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSearch from './header_search'
import { withRouter } from "react-router";

const HeaderSearchWithRouter = withRouter(HeaderSearch)

class Header extends React.Component{
  constructor(props){
    super(props)
  }



  render(){
    let { currentUser, logout } = this.props
    const goHome = ()=>{
      document.location.href = '#/'
    }
  
    const sessionLinks = () => (
      <nav className="navbar-right">
        <a href="#/groups" className="navbar-explore-link">Explore</a>
        <HeaderSearchWithRouter />
        <Link className="navbar-login-signup-link" to="/login">Log in</Link>
        <Link className="navbar-login-signup-link" to="/signup">Sign up</Link>
      </nav>
    );
  
    const signedIn = () => (
      <nav className="navbar-right">
        <a href="#/groups/form/new" className="navbar-group-link">Start a New Squad</a>
        <HeaderSearchWithRouter />
        <a href="#/groups" className="navbar-explore-link">Explore</a>
        <a onClick={logout} className="navbar-dropdown" to="/login">Logout</a>
      </nav>
    );
      
    return (
      
      <div className="navbar-header">
        <nav className="navbar-left">
          <img className="navbar-logo" src={window.fightclubURL} onClick={goHome}/>
          <i className="fab fa-github"></i>
          <i className="fab fa-linkedin-in"></i>
        </nav>
        {currentUser ? signedIn() : sessionLinks()}
      </div>
    )
    
  }
}


export default Header;
