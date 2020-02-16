import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSearch from './header_search'
import { withRouter } from "react-router";

const HeaderSearchWithRouter = withRouter(HeaderSearch)

class Header extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userHasMemberships: false
    }
  }

  componentDidMount(){
    this.props.fetchMemberships(0)
      .then( data => {
        if (data.memberships.userHasMemberships){
          this.setState({ userHasMemberships: true})
        }
      })
  }

  componentDidUpdate(prevProps){
    if (this.props.currentUser !== prevProps.currentUser){
      this.props.fetchMemberships(0)
        .then(data => {
          if (data.memberships.userHasMemberships) {
            this.setState({ userHasMemberships: true })
          }
        })
    }
  }

  render(){
    let { currentUser, logout } = this.props
    const goHome = ()=>{
      document.location.href = '#/'
    }
  
    const sessionLinks = () => (
      <nav className="navbar-right">
        <Link className="navbar-explore-link" to="/groups">Explore</Link>
        {/* <a href="#/groups" className="navbar-explore-link">Explore</a> */}
        <HeaderSearchWithRouter />
        <Link className="navbar-login-signup-link" to="/login">Log in</Link>
        <Link className="navbar-login-signup-link" to="/signup">Sign up</Link>
      </nav>
    );
  
    const signedIn = () => (
      <nav className="navbar-right">
        <Link to="/groups/form/new">Start a New Squad</Link>
        {this.state.userHasMemberships ? <Link to="/chat">Messenger</Link> : 
          <Link 
            className="on-hover-messenger"
            to="/groups">
          Messenger
          <span className="on-hover-messenger-tooltip">Join a group to use messenger</span>
          </Link>}
        
        {/* <a href="#/groups/form/new" className="navbar-group-link">Start a New Squad</a> */}
        <Link to="/groups">Explore</Link>
        <HeaderSearchWithRouter />
        <Link onClick={logout} to="/login">Logout</Link>
        {/* <a href="#/groups" className="navbar-explore-link">Explore</a> */}
        {/* <a onClick={logout} className="navbar-dropdown" to="/login">Logout</a> */}
      </nav>
    );
      
    return (
      
      <div className="navbar-header">
        <nav className="navbar-left">
          <img className="navbar-logo" src={window.fightclubURL} onClick={goHome}/>
          <a target="_blank" href="https://github.com/kenhufford">
            <i className="fab fa-github"></i>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/kenneth-hufford-b09a324b/">
            <i className="fab fa-linkedin-in"></i>
          </a>
          
        </nav>
        {currentUser ? signedIn() : sessionLinks()}
      </div>
    )
    
  }
}


export default Header;
