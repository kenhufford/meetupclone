import React from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from "react-onclickoutside";

class DropdownLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listOpen: false
        }
    }

    handleClickOutside() {
        this.setState({
            listOpen: false
        })
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    render() {
        const { links, title } = this.props
        const { listOpen } = this.state
        if (links.length === 0) return null
        return (
            <div className="dropdown-links"
                onClick={() => this.toggleList()}>
                <div className="dropdown-links-header-title">
                    {title}
                </div>
                {listOpen && <ul className="dropdown-links-header-list">
                    {links.map((link, index) => (
                        <Link className="dropdown-links-header-list-item"
                            key={index}
                            to={link.address}
                            onClick={() => {
                                this.handleClickOutside();
                                if (link.callback) link.callback();
                            }}>
                            {link.name}
                        </Link>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default onClickOutside(DropdownLinks)