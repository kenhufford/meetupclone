import React from 'react';
// import onClickOutside from "react-onclickoutside";

class DropdownFilters extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     listOpen: false
        // }
    }

    // handleClickOutside() {
    //     this.setState({
    //         listOpen: false
    //     })
    // }

    // toggleList() {
    //     this.setState(prevState => ({
    //         listOpen: !prevState.listOpen
    //     }))
    // }

    render() {
        const { filters, title } = this.props
        return (
            <div className="dropdown-filters">
                <div className="dropdown-links-header-title">
                    {title}
                </div>
                <ul className="dropdown-filters-header-list">
                    {filters.map((filter, index) => (
                        <li className="dropdown-links-header-list-item"
                            key={index}
                            onClick={() => {
                                filter.setSelectedId();
                            }}>
                            {filter.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default DropdownFilters