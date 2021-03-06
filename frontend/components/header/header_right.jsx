import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import HeaderSearch from './header_search';
const HeaderSearchWithRouter = withRouter(HeaderSearch)

const HeaderRight = (props) => {
    const { currentUser, currentUserId, userHasMemberships, logout} = props;
    const sessionLinks =
        <nav className="navbar-right">
            <Link className="navbar-explore-link" 
                to="/index/squads">
                Explore
            </Link>
            <HeaderSearchWithRouter />
            <Link className="navbar-login-signup-link"
                to="/login">
                Log in
            </Link>
            <Link className="navbar-login-signup-link"
                to="/signup">
                Sign up
            </Link>
        </nav>
    const signedIn =
        <nav className="navbar-right">
            <Link to="/groups/form/new">
                Start New Squad
            </Link>
            {userHasMemberships ? <Link to="/chat">Messenger</Link> :
                <div></div>}
            <Link to={`/users/${currentUserId}`}>
                Dashboard
            </Link>
            <Link to="/index/squads">
                Explore
            </Link>
            <HeaderSearchWithRouter />
            <Link to="/login"
                onClick={logout}>
                Logout
            </Link>
        </nav>
    return (
        currentUser ? signedIn: sessionLinks
    )
}

export default HeaderRight;