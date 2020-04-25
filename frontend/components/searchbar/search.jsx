import React, {useState, useEffect} from 'react';
import GroupIndexList from '../groups/group_index/group_index_list';
import EventIndexList from '../events/event_index/event_index_list_short';
import SearchBar from '../searchbar/search_bar';
import SearchBarFilter from './search_bar_filter';

const Search = props => {
    let { groups, events, locations, categories } = props;
    const [query, setQuery] = useState("");
    const [lastQueryName, setLastQueryName] = useState("");
    const [locIndex, setLocIndex] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let queryString = props.location.search;
        search(queryString);
        setQuery(queryString);
    }, [props.location.search]);

    const addFilters = (filters) => {
        let locationIds = filters.locs;
        let categoryIds = filters.cats;
        let filtersToAdd = [];
        if (lastQueryName !== "") filtersToAdd.push(`name=${lastQueryName}`)
        if (locationIds.length) filtersToAdd.push("location=" + locationIds.join("."));
        if (categoryIds.length) filtersToAdd.push("category=" + categoryIds.join("."));
        props.history.push("?"+filtersToAdd.join("&"));
    }

    const search = (query) => {
        let lastQueryIndex;
        let locIndexNum = [];
        if (query.indexOf("name=") !== -1){
            lastQueryIndex = query.indexOf("name=") + 5;
        }
        if (query.indexOf("location=") !== -1) {
            let index = query.indexOf("location=") + 9;
            locIndexNum = query.slice(index).split("&")[0].split(".");
        }
        locIndexNum = locIndexNum.map(ele => parseInt(ele));
        let lastQueryString = "";
        if(lastQueryIndex !== undefined){
            lastQueryString += query.slice(lastQueryIndex).split("&")[0].split("%20").join(" ");
        }
        const fetchLocations = props.fetchLocations();
        const fetchCategories = props.fetchCategories();
        const searchGroups = props.searchGroups(query);
        const searchEvents = props.searchEvents(query);
        const fetchArray = [fetchLocations, fetchCategories, searchGroups, searchEvents];
        Promise.all(fetchArray)
            .then(()=> {
                setLastQueryName(lastQueryString.toUpperCase());
                setLocIndex(locIndexNum);
                setLoaded(true);
            })
    }
    if (loaded){
        groups = ("allGroupsCount" in groups && groups.allGroupsCount) ? Object.values(groups.allGroups) : [];
        events = ("allEvents" in events && events.allEventsCount) ? Object.values(events.allEvents) : [];
        let squadMessages = groups.length === 0 ? (<p>No results found</p>) : (<p></p>);
        let brawlMessages = events.length === 0 ? (<p>No results found</p>) : (<p></p>);
        let lastQueryString = lastQueryName === "" ? "" : "FOR " + lastQueryName;
        if (locIndex.length) {
            lastQueryString += " IN ";
            let first = locations[locIndex[0]].name.toUpperCase();
            if (locIndex.length === 1) lastQueryString += first;
            else if (locIndex.length === 2) {
                let second = locations[locIndex[1]].name.toUpperCase();
                lastQueryString += first + " AND " + second;
            }
            else if (locIndex.length >= 3){
                let second = locations[locIndex[1]].name.toUpperCase();
                lastQueryString += first + ", " + second + " AND OTHER LOCATIONS";
            }
        }
        let searchedGroups = (
            <ul className="groups-index-div-results">
                <p>SQUAD RESULTS {lastQueryString}</p>
                <span>{squadMessages}</span>
                {groups.length === 0 ? <div className="groups-div"></div>:
                    <div className="groups-div">
                        <GroupIndexList
                            groups={groups}
                        />
                    </div>
                }
            </ul>
        )
        let searchedEvents = events.length ? (
            <ul className="groups-index-div-results">
                <p>BRAWL RESULTS {lastQueryString}</p>
                <span>{brawlMessages}</span>
                <div className="groups-div">
                    <EventIndexList
                        events={events}/>
                </div>
            </ul>
        ) : (<div></div>)

        return(
            <div className="groups-search-div">
                <div className="groups-search-bar-div">
                    <SearchBarFilter
                        categories={categories}
                        locations={locations}
                        addFilters={addFilters} />
                    <SearchBar 
                        history={props.history} 
                        autoSearch={true}
                        filters={true}
                        />
                </div>
                {searchedGroups}
                {searchedEvents}
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default Search