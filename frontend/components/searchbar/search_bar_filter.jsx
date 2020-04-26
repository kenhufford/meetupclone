import React, {useState} from 'react';
import debounce from "lodash.debounce";

const SearchBarFilter = props => {
    const [listOpen, setListOpen] = useState(false);
    const [delay, setDelay] = useState(0);
    let {categories, locations, addFilters,searchType,
        selectedCats, selectedLocs, setSelectedCats, setSelectedLocs} = props;
    const toggleBox = (id, type) => {
        if(type==="category"){
            let ids = selectedCats;
            let selectedIndex = selectedCats.indexOf(id);
            if(selectedIndex !== -1){
                [ids[selectedIndex], ids[0]] = [id[0], ids[selectedIndex]];
                ids.shift();
            } else {
                ids.push(id)
            }
            setSelectedCats([...ids])
        } else {
            let ids = selectedLocs;
            let selectedIndex = selectedLocs.indexOf(id);
            if (selectedIndex !== -1) {
                [ids[selectedIndex], ids[0]] = [id[0], ids[selectedIndex]];
                ids.shift();
            } else {
                ids.push(id)
            }
            setSelectedLocs([...ids])
        }
    }
    
    let catBoxes = Object.values(categories).map(category => {
        let checked = selectedCats.includes(category.id);
        return <li className="search-bar-filter-list-item"
            onClick={() => toggleBox(category.id, "category")}
            key={`category${category.id}`}>
            <input type="checkbox"
                className="filter-checkbox"
                name={category.name}
                checked={checked}
                />
            <label>
                {category.name}
            </label>
        </li>
        }
    )

    let locBoxes = Object.values(locations).map(location => {
        let checked = selectedLocs.includes(location.id);
        return <li className="search-bar-filter-list-item"
            onClick={() => toggleBox(location.id, "location")}
            key={`location${location.id}`}>
            <input type="checkbox"
                className="filter-checkbox"
                name={location.name}
                checked={checked}
                />
            <label>
                {location.name}
            </label>
        </li>}
    )
    return (
        <div className="search-bar-filter"
                onMouseLeave={() => 
                    debounce(setListOpen(false), 1000)}
                onMouseEnter={() => setListOpen(true)}>
            <div className="search-bar-filter-title-div">
                <p className="search-bar-filter-title-text">
                    FILTERS
            </p>
            </div>
            {listOpen && 
            <div className="search-bar-filter-dropdown">
                {searchType!=="SQUADS" ? <div></div>:
                    <ul className="search-bar-filter-list">
                        <p className="search-bar-filter-list-title">
                            STYLES
                    </p>
                        {catBoxes}
                    </ul>}
                <ul className="search-bar-filter-list">
                    <p className="search-bar-filter-list-title">
                        LOCATIONS
                    </p>
                    {locBoxes}
                    <div className="search-bar-filter-title-div"
                        onClick={() => {
                            addFilters({
                                cats: selectedCats,
                                locs: selectedLocs});
                            setListOpen(false);
                            }}>
                        <p className="search-bar-filter-title-text">
                            APPLY
                        </p>
                    </div>
                        
                </ul>
            </div>}
        </div>
    )
}

export default SearchBarFilter;