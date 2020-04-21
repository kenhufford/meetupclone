import React, {useState, Fragment} from 'react';

const SearchBarFilter = props => {
    const [selectedCats, setSelectedCats] = useState({});
    const [selectedLocs, setSelectedLocs] = useState({});
    let {categories, locations} = props;
    debugger
    
    let catBoxes = Object.values(categories).map(cat => 
        <li className="search-bar-filter-list-item">
            <input type="checkbox"
                id={`category${cat.id}`}
                key={`category${cat.id}`}
                name={cat.name}
                value={cat.name}
                />
            <label>
                {cat.name}
            </label>
        </li>
    )
    let locBoxes = Object.values(locations).map(loc => 
        <li className="search-bar-filter-list-item">
            <input type="checkbox"
                id={`location${loc.id}`}
                key={`location${loc.id}`}
                name={loc.name}
                value={loc.name}
                />
            <label>
                {loc.name}
            </label>
        </li>
    )
    return (
        <div className="search-bar-filter">
            <p className="search-bar-filter-title">Filters</p>
            <div className="search-bar-filter-dropdown">
                <ul className="search-bar-filter-list">
                    <p>Locations</p>
                    {locBoxes}
                </ul>
                <ul className="search-bar-filter-list">
                    <p>Fighting Styles</p>
                    {catBoxes}
                </ul>
            </div>
        </div>
    )
}

export default SearchBarFilter;