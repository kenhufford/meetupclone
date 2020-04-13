import React from 'react';

const DropdownFilters = props => {
    const { filters, title, selected } = props;
    return (
        <div className="dropdown-filters">
            <div className="dropdown-filters-title">
                {title}
            </div>
            <ul className="dropdown-filters-list">
                {filters.map((filter, index) => (
                    <li className="dropdown-filters-list-item"
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

export default DropdownFilters;