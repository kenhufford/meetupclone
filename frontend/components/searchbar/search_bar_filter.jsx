import React, {useState} from 'react';

const SearchBarFilter = props => {
    const [selectedCats, setSelectedCats] = useState([]);
    const [selectedLocs, setSelectedLocs] = useState([]);
    let {categories, locations, addFilters} = props;
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
            key={`category${category.id}`}>
            <input type="checkbox"
                onChange={()=>toggleBox(category.id, "category")}
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
            key={`location${location.id}`}>
            <input type="checkbox"
                onChange={() => toggleBox(location.id, "location")}
                name={location.name}
                checked={checked}
                />
            <label>
                {location.name}
            </label>
        </li>}
    )
    return (
        <div className="search-bar-filter">
            <p className="search-bar-filter-title">Filters</p>
            <div className="search-bar-filter-dropdown">
                <ul className="search-bar-filter-list">
                    <p>Locations</p>
                    {locBoxes}
                    <button
                        onClick={() => addFilters({
                            cats: selectedCats,
                            locs: selectedLocs
                        })}>
                        Apply Filters
                    </button>
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