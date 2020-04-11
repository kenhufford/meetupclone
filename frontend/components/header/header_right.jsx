import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import HeaderSearch from './header_search';
import DropdownLinks from '../dropdown_links';
const HeaderSearchWithRouter = withRouter(HeaderSearch)

const HeaderRight = (props) => {
    const { currentUser, currentUserId, userHasMemberships, logout} = props;
    const links = [
        { address: `/users/${currentUserId}`, name:"My Profile"},
        { address: "/login", name:"Logout", callback: logout}
    ]
    const sessionLinks =
        <nav className="navbar-right">
            <Link className="navbar-explore-link" 
                to="/index/squads">
                Explore
            </Link>
            <Link className="navbar-login-signup-link" 
                to="/login">
                Log in
            </Link>
            <Link className="navbar-login-signup-link" 
                to="/signup">
                Sign up
            </Link>
            <HeaderSearchWithRouter />
        </nav>
    const signedIn =
        <nav className="navbar-right">
            <Link to="/groups/form/new">
                Start a New Squad
            </Link>
            {userHasMemberships ? <Link to="/chat">Messenger</Link> :
                <div></div>}
            <Link to="/index/squads">
                Explore
            </Link>
            <DropdownLinks 
                title="Profile"
                links={links}
                />
            <HeaderSearchWithRouter />
        </nav>
    return (
        currentUser ? signedIn: sessionLinks
    )
}

export default HeaderRight;