import React from 'react';
import GroupIndexList from '../groups/group_index/group_index_list';
import EventIndexList from '../events/event_index/event_index_list_short';
import SearchBar from '../searchbar/search_bar';
import SearchBarFilter from './search_bar_filter';

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            query: "",
            lastQuery: "",
            locIndex: null,
            loaded: false,
        }
        this.update = this.update.bind(this);
        this.search = this.search.bind(this);
        this.addFilters = this.addFilters.bind(this);
    }

    update(e) {
        this.setState({
            query: e.currentTarget.value
        });
    }

    componentDidMount(){
        let queryString = this.props.location.search;
        this.search(queryString)
        console.log(queryString)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            let split = this.props.location.search;
            this.search(split)
        }
    }

    addFilters(filters){
        let locationIds = filters.locs;
        let categoryIds = filters.cats;
        let filtersToAdd = [];
        if (this.state.query !== "") filtersToAdd.push(`name=${this.state.query}`)
        if (locationIds.length) filtersToAdd.push("location=" + locationIds.join("."));
        if (categoryIds.length) filtersToAdd.push("category=" + categoryIds.join("."));
        this.props.history.push("?"+filtersToAdd.join("&"));
    }

    search(query){
        let lastQueryIndex;
        let locIndex;
        if (query.indexOf("name=") !== -1){
            lastQueryIndex = query.indexOf("name=") + 5;
        }
        if (query.indexOf("location=") !== -1) {
            let index = query.indexOf("location=") + 9;
            locIndex = query.slice(index).split("&")[0].split(".");
        }
        let lastQuery = "";
        if(lastQueryIndex !== undefined){
            lastQuery += "FOR " + query.slice(lastQueryIndex).split("&")[0].split("%20").join(" ");
        }
        
        let fetchLocations = this.props.fetchLocations();
        let fetchCategories = this.props.fetchCategories();
        let searchGroups = this.props.searchGroups(query);
        let searchEvents = this.props.searchEvents(query);
        let fetchArray = [fetchLocations, fetchCategories, searchGroups, searchEvents];
        Promise.all(fetchArray)
            .then(()=> this.setState({
                            query: "",
                            lastQuery: lastQuery.toUpperCase(),
                            locIndex,
                            loaded: true
                        }))
    }

    render(){
        if (this.state.loaded){
            let {groups, events, locations, categories} = this.props;
            let {locIndex} = this.state;
            groups = ("allGroups" in groups) ? Object.values(groups.allGroups) : [];
            events = ("allEvents" in events) ? Object.values(events.allEvents) : [];
            let squadMessages = groups.length === 0 ? (<p>No results found</p>) : (<p></p>)
            let brawlMessages = events.length === 0 ? (<p>No results found</p>) : (<p></p>)
            let lastQuery=this.state.lastQuery.toUpperCase();
            if (locIndex) {
                lastQuery += " IN ";
                let first = locations[locIndex[0]].name.toUpperCase();
                if (locIndex.length === 1) lastQuery += first;
                else if (locIndex.length === 2) {
                    let second = locations[locIndex[1]].name.toUpperCase();
                    lastQuery += first + " AND " + second;
                }
                else if (locIndex.length === 3){
                    let second = locations[locIndex[1]].name.toUpperCase();
                    lastQuery += first + ", " + second + " AND OTHER LOCATIONS";
                }
            }
            let searchedGroups = (
                <ul className="groups-index-div-results">
                    <p>SQUAD RESULTS {lastQuery}</p>
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
                    <p>BRAWL RESULTS {lastQuery}</p>
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
                            addFilters={this.addFilters} />
                        <SearchBar 
                            history={this.props.history} 
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
}

export default Search