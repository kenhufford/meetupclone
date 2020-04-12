import React from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from "react-onclickoutside";

class DropdownFilters extends React.Component {
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
        const { filters, title } = this.props
        const { listOpen } = this.state;
        return (
            <div className="dropdown-links"
                onClick={() => this.toggleList()}>
                <div className="dropdown-links-header-title">
                    {title}
                </div>
                {listOpen && <ul className="dropdown-links-header-list">
                    {filters.map((filter, index) => (
                        <li className="dropdown-links-header-list-item"
                            key={index}
                            onClick={() => {
                                this.handleClickOutside();
                                filter.setSelectedId();
                            }}>
                            {filter.name}
                        </li>
                    ))}
                </ul>}
            </div>
        )
    }
}

export default onClickOutside(DropdownFilters)