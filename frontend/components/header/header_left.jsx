import React from 'react';

const HeaderLeft = () => {
    return (
        <nav className="navbar-left">
            <img className="navbar-logo"
                src={window.fightclubURL}
                onClick={() => document.location.href = '#/'}/>
            <a target="_blank"
                href="https://github.com/kenhufford">
                <i className="fab fa-github"></i>
            </a>
            <a target="_blank"
                href="https://www.linkedin.com/in/kenneth-hufford-b09a324b/">
                <i className="fab fa-linkedin-in"></i>
            </a>
        </nav>
    )
}

//somethingelse

export default HeaderLeft;