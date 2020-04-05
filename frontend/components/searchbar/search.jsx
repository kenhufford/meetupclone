import React from 'react';
import GroupIndexList from '../groups/group_index_list';
import EventIndexList from '../events/event_index_list_short';
import SearchBar from '../searchbar/search_bar';

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            groups: [],
            events: [],
            query: "",
            lastQuery: "",
            loaded: false,
            typing: false,
            typingTimeout: 0
        }
        this.update = this.update.bind(this)
        this.search = this.search.bind(this)
    }

    update(e) {
        this.setState({
            query: e.currentTarget.value
        });
    }

    componentDidMount(){
        let split = this.props.location.search.slice(1).split("%20")
        this.search(split)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            let split = this.props.location.search.slice(1).split("%20")
            this.search(split)
        }
    }

    search(split){
        let result = split.join(" ")
        this.setState({lastQuery: result})
        let fetchGroupsFromLocation = this.props.fetchGroupsFromLocation(split[1])
        let fetchEventsFromLocation = this.props.fetchEventsFromLocation(split[1])
        let fetchGroupsFromCategory = this.props.fetchGroupsFromCategory(split[1])
        // let searchGroups = this.props.searchGroups(result)
        // let searchEvents = this.props.searchEvents(result)
        let fetchLocations = this.props.fetchLocations(result)
        let fetchCategories = this.props.fetchCategories(result)

        let setSearchStateSuccessBoth =  (payload) => {
            let events = (payload[1]===undefined) ? []: Object.values(payload[1].events)
            let groups = (payload[0]===undefined) ? []: Object.values(payload[0].groups)
            let newState = Object.assign({}, {
                query: "",
                lastQuery: result.toUpperCase(),
                groups: groups,
                events: events,
                loaded: true
            })
            this.setState(newState)
        }
        let setSearchStateSuccessEvents =  (payload) => {
            let events = (payload[0]===undefined) ? []: Object.values(payload[0].events.allEvents)

            let newState = Object.assign(this.state, {
                query: "",
                lastQuery: result.toUpperCase(),
                events: events,
                loaded: true
            })
            this.setState(newState)
        }
        let setSearchStateSuccessGroups =  (payload) => {
            let groups = (payload[0]===undefined) ? []: Object.values(payload[0].groups.allGroups)

            let newState = Object.assign(this.state, {
                query: "",
                lastQuery: result.toUpperCase(),
                groups: groups,
                loaded: true
            })
            this.setState(newState)
        }

        let setSearchStateFail= (payload) => {
            let newState = Object.assign({}, {
                query: "",
                lastQuery: result.toUpperCase(),
                groups: [],
                events: [],
                loaded: true
            })
            this.setState(newState)
        }

        let setSearchStateFailOne= (payload) => {
            let newState = Object.assign({}, {
                query: "",
                lastQuery: result.toUpperCase(),
                loaded: true
            })
            this.setState(newState)
        }
         
        switch (split[0]) {
            case "location":
                this.setState({groups: [], events: []})
                Promise.all([fetchGroupsFromLocation, fetchEventsFromLocation, fetchLocations])
                    .then(setSearchStateSuccessBoth, setSearchStateFail)
                    break;
            case "category":
                this.setState({groups: [], events: []})
                Promise.all([fetchGroupsFromCategory, fetchCategories])
                    .then(setSearchStateSuccessGroups, setSearchStateFailOne)
                    break;
            default:
                this.setState({groups: [], events: []})
                Promise.all([searchGroups])
                    .then(setSearchStateSuccessGroups, setSearchStateFailOne)
                Promise.all([searchEvents])
                    .then(setSearchStateSuccessEvents, setSearchStateFailOne)
                break;
        }
    }

    render(){
        if (this.state.loaded){
            let squadsOnly = (this.props.location.search.slice(1).split("%20"))[0] !== "category"
            let {groups, events} = this.state;
            let {locations, categories} = this.props;
            let squadMessages = groups.length === 0 ? (<p>No results found</p>) : (<p></p>)
            let brawlMessages = events.length === 0 ? (<p>No results found</p>) : (<p></p>)
            let lastQuery=this.state.lastQuery.toUpperCase();
            let array = lastQuery.split(" ");
            let index = array[array.length-1];
            if (lastQuery.includes("LOCATION")){
                
                lastQuery = locations[index].name.toUpperCase()
            } else if (lastQuery.includes("CATEGORY")) {
                lastQuery = categories[index].name.toUpperCase()
            } 
            let searchedGroups = (
                <ul className="groups-index-div-results">
                    <p>SQUAD RESULTS FOR {lastQuery}</p>
                    <span>{squadMessages}</span>
                    <div className="groups-div">
                        <GroupIndexList
                            groups={Object.values(groups[0])}
                            />
                    </div>
                </ul>
            )
            let searchedEvents = squadsOnly ? (
                <ul className="groups-index-div-results">
                    <p>BRAWL RESULTS FOR {lastQuery}</p>
                    <span>{brawlMessages}</span>
                    <div className="groups-div">
                        <EventIndexList
                            events={Object.values(events[0])}/>
                    </div>
                </ul>
            ) : (<div></div>)

            return(
                <div className="groups-search-div">
                    <div className="groups-search-bar-div">
                        <SearchBar history={this.props.history} autoSearch={true} />
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