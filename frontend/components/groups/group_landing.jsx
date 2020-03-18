import React from 'react';
import GroupIndexList from './group_index_list';
import EventIndexListShort from '../events/event_index_list_short';
import SearchBar from '../../components/searchbar/search_bar';
import CreateGroupFormDropdown from '../../components/groups/create_group_form_dropdown';

class GroupLanding extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedLocation: "San Francisco",
            selectedLocationId: 1,
            loaded: false
        }
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    toggleSelected(index){
        let loc = this.props.locations[index]
        this.setState({
          selectedLocation: loc.name,
          selectedLocationId: loc.id
        })
    }

    componentDidMount(){
        const fetchGroups = this.props.fetchGroups();
        const fetchEvents = this.props.fetchEvents();
        const fetchLocations = this.props.fetchLocations()

        Promise.all([fetchEvents, fetchGroups, fetchLocations])
            .then( (data) => {
                if (this.props.currentUser.locationId !== undefined){
                    this.setState({
                        loaded: true,
                        location: Object.values(data[2].locations),
                        selectedLocation: data[2].locations[this.props.currentUser.locationId].name,
                        selectedLocationId: this.props.currentUser.locationId
                    });
                } else {
                    this.setState({
                        loaded: true,
                        location: Object.values(data[2].locations)
                    });
                }
        })
    }


    render(){
        let {loaded, selectedLocationId, selectedLocation} = this.state;
        let {groups, events, history, locations} = this.props;
        if (loaded){
            let nearbyGroups = groups.filter(group => group.locationId === selectedLocationId)
            let nearbyEvents = events.filter(event => event.locationId === selectedLocationId)
            return(
                <div className="landing">
                    <div className="landing-banner">
                        <div className="landing-banner-left">
                            <h1 className="landing-banner-left-title">Join the ultimate brawl</h1>
                            <h3 className="landing-banner-left-subtitle">Find your spirit squad and enter the fray</h3>
                            <SearchBar 
                                history={history} 
                                autoSearch={false} />
                        </div>
                        <div className="landing-banner-right">
                            <img className="landing-banner-right-image" 
                                src={window.mainImageURL}/>
                        </div>
                    </div>
                    <div className="landing-main">
                        <div className="landing-location-dropdown">
                            <div className="landing-location-h4">
                                Squads in {selectedLocation}
                            </div>
                            <CreateGroupFormDropdown 
                                location={selectedLocation} 
                                list={locations} 
                                toggleLocation={this.toggleSelected} />
                        </div>
                        <GroupIndexList groups={nearbyGroups}/>
                        <div className="landing-location-h4">Events in {selectedLocation}</div>
                        <EventIndexListShort 
                            events={nearbyEvents} />
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default GroupLanding