import React, {useState, useEffect} from 'react';
import IndexBox from '../groups/group_index/group_index_box';
import SearchBar from '../searchbar/search_bar';
import SearchBarFilter from './search_bar_filter';
import useFetches from '../hooks/use_fetches';

const Search = props => {
    let { groups, events, locations, categories } = props;
    const [lastQueryName, setLastQueryName] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [searchType, setSearchType] = useState("SQUADS");
    const [groupPage, setGroupPage] = useState(1);
    const [groupLimit, setGroupLimit] = useState(3);
    const [maxGroups, setMaxGroups] = useState(null);
    const [eventPage, setEventPage] = useState(1);
    const [eventLimit, setEventLimit] = useState(3);
    const [maxEvents, setMaxEvents] = useState(null);
    const [selectedCats, setSelectedCats] = useState([]);
    const [selectedLocs, setSelectedLocs] = useState([]);
    const fetchLocations = props.fetchLocations;
    const fetchCategories = props.fetchCategories;

    useFetches(setLoaded, [], fetchLocations, fetchCategories);
    useEffect(() => {
        const query = props.location.search;
        let nameQueryIndex;
        let selectedLocsNums = [];
        let selectedCatsNums = []
        let queryName = "";
        if (query.indexOf("name=") !== -1) {
            nameQueryIndex = query.indexOf("name=") + 5;
        }
        if (query.indexOf("location=") !== -1) {
            let index = query.indexOf("location=") + 9;
            selectedLocsNums = query.slice(index).split("&")[0].split(".").map(ele => parseInt(ele));
            setSelectedLocs(selectedLocsNums);
            console.log(selectedLocsNums)
        }
        if (query.indexOf("category=") !== -1) {
            let index = query.indexOf("category=") + 9;
            selectedCatsNums = query.slice(index).split("&")[0].split(".").map(ele => parseInt(ele));
            setSelectedCats(selectedCatsNums);
            console.log(selectedCatsNums)
        }
        if (nameQueryIndex !== undefined) queryName += query.slice(nameQueryIndex).split("&")[0].split("%20").join(" ");
        setLastQueryName(queryName.toUpperCase());
        let data = {
            query,
            "allPage": searchType === "SQUADS" ? groupPage : eventPage,
            "allLimit": searchType === "SQUADS" ? groupLimit : eventLimit
        }
        const search = searchType === "SQUADS" ? props.searchGroups(data) : props.searchEvents(data);
        search.then((data) => {
            let info = Object.values(data)[1];
            if(searchType==="SQUADS") setMaxGroups(info["allGroupsCount"])
            else if(searchType==="BRAWLS") setMaxEvents(info["allEventsCount"])
            setLoaded(true);
        })
    }, [props.location.search, searchType, eventPage, groupPage, eventLimit, groupLimit]);
    
    const switchPage = (dir, type) => {
        if (type === "groups") {
            let maxPage = Math.ceil(maxGroups / groupLimit);
            if (dir === "back" && groupPage > 1) setGroupPage(groupPage - 1);
            if (dir === "forward" && groupPage < maxPage) setGroupPage(groupPage + 1);
            if (dir === "allBack") setGroupPage(1);
            if (dir === "allForward" && groupPage < maxPage) setGroupPage(maxPage);
        } else {
            let maxPage = Math.ceil(maxEvents / eventLimit);
            if (dir === "back" && eventPage > 1) setEventPage(eventPage - 1);
            if (dir === "forward" && eventPage < maxPage) setEventPage(eventPage + 1);
            if (dir === "allBack") setEventPage(1);
            if (dir === "allForward" && eventPage < maxPage) setEventPage(maxPage);
        }
    }

    const setLimit = (max, type) => {
        if(type === "groups"){
            setGroupLimit(max);
            setGroupPage(1);
        } else {
            setEventLimit(max);
            setEventPage(1);
        }
    }

    const addFiltersAndSearch = (filters) => {
        const locationIds = filters.locs;
        const categoryIds = filters.cats;
        const filtersToAdd = [];
        if (lastQueryName !== "") filtersToAdd.push(`name=${lastQueryName}`)
        if (locationIds.length) filtersToAdd.push("location=" + locationIds.join("."));
        if (categoryIds.length) filtersToAdd.push("category=" + categoryIds.join("."));
        props.history.push("?"+filtersToAdd.join("&"));
    }

    if (loaded){
        groups = ("allGroupsCount" in groups && groups.allGroupsCount) ? Object.values(groups.allGroups) : [];
        events = ("allEventsCount" in events && events.allEventsCount) ? Object.values(events.allEvents) : [];
        let lastQueryString = lastQueryName === "" ? "" : "FOR " + lastQueryName;
        if (selectedLocs.length) {
            lastQueryString += " IN ";
            let first = locations[selectedLocs[0]].name.toUpperCase();
            if (selectedLocs.length === 1) lastQueryString += first;
            else if (selectedLocs.length === 2) {
                let second = locations[selectedLocs[1]].name.toUpperCase();
                lastQueryString += first + " AND " + second;
            }
            else if (selectedLocs.length >= 3){
                let second = locations[selectedLocs[1]].name.toUpperCase();
                lastQueryString += first + ", " + second + " AND OTHER LOCATIONS";
            }
        }
        let searchedGroups =  <IndexBox
                                type="groups"
                                items={groups}
                                title={groups.length === 0 ? `NO RESULTS ${lastQueryString}` : `RESULTS ${lastQueryString}`}
                                switchPage={switchPage}
                                currentPage={groupPage}
                                setLimit={setLimit}
                                max={Math.ceil(maxGroups / groupLimit)}
                                limit={groupLimit}/> 
        let searchedEvents = <IndexBox
                                type="events"
                                items={events}
                                title={events.length === 0 ? `NO RESULTS ${lastQueryString}` : `RESULTS ${lastQueryString}`}
                                switchPage={switchPage}
                                currentPage={eventPage}
                                setLimit={setLimit}
                                max={Math.ceil(maxEvents / eventLimit)}
                                limit={eventLimit} /> 

        return(
            <div className="groups-search-div">
                <div className="groups-search-bar-div">
                    <SearchBarFilter
                        searchType={searchType}
                        categories={categories}
                        locations={locations}
                        addFilters={addFiltersAndSearch}
                        setSelectedCats={setSelectedCats}
                        setSelectedLocs={setSelectedLocs}
                        selectedCats={selectedCats}
                        selectedLocs={selectedLocs} />
                    <div className="index-switch-div">
                        <div className={searchType === "SQUADS" ? "index-switch-selected" : "index-switch-not"}>
                            <div className={searchType === "SQUADS" ? "index-switch-text-selected" : "index-switch-text-not"}
                                onClick={() => setSearchType("SQUADS")}>
                                SQUADS
                            </div>
                        </div>
                        <div className={searchType === "BRAWLS" ? "index-switch-selected" : "index-switch-not"}>
                            <div className={searchType === "BRAWLS" ? "index-switch-text-selected" : "index-switch-text-not"}
                                onClick={() => setSearchType("BRAWLS")}>
                                BRAWLS
                            </div>
                        </div>
                    </div>
                    <SearchBar 
                        history={props.history} 
                        autoSearch={true}
                        filters={true}
                        lastQueryName={lastQueryName}
                        />
                </div>
                {searchType==="SQUADS" ? searchedGroups : searchedEvents}
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default Search