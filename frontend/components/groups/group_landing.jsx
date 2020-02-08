import React from 'react';
import GroupIndexItem from './group_index_item'
import EventIndexItem from '../events/event_index_item'
import SearchBar from '../../components/searchbar/search_bar'
import CreateGroupFormDropdown from '../../components/groups/create_group_form_dropdown'

class GroupLanding extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedLocation: "San Francisco",
            selectedLocationId: 1,
            location: this.props.locations,
            loaded: false
        }
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    toggleSelected(index){
        let loc = this.state.location[index]
        this.setState({
          selectedLocation: loc.name,
          selectedLocationId: loc.id
        })
    }

    componentDidMount(){
        const fetchGroups = this.props.fetchGroups();
        const fetchEvents = this.props.fetchEvents();
        const fetchLocations = this.props.fetchLocations()
            .then( (payload) => {
                this.setState({
                    location: Object.values(payload.locations)
                })
            });

        Promise.all([fetchEvents, fetchGroups, fetchLocations])
        .then( () => this.setState({loaded:true}))
    }


    render(){
        if (this.state.loaded){
            let nearbyGroups = []
            this.props.groups.map(group => {
                if (group.locationId === this.state.selectedLocationId) nearbyGroups.push(group)
            })
            let nearbyEvents = []
            this.props.events.map(event => {
                if (event.locationId === this.state.selectedLocationId) nearbyEvents.push(event)
            })
            return(
                <div className="landing">
                    <div className="landing-banner">
                        <div className="landing-banner-left">
                            <h1 className="landing-banner-left-title">Join the ultimate brawl</h1>
                            <h3 className="landing-banner-left-subtitle">Find your spirit squad and enter the fray</h3>
                            <SearchBar history={this.props.history} autoSearch={false} />
                        </div>
                        <div className="landing-banner-right">
                            <img className="landing-banner-right-image" src={window.mainImageURL}/>
                        </div>
                    </div>
                    <div className="landing-main">
                        <div className="landing-location-dropdown">
                            <h4 className="landing-location-h4">Squads in {this.state.selectedLocation}</h4>
                            <CreateGroupFormDropdown location={this.state.selectedLocation} list={this.state.location} toggleLocation={this.toggleSelected} />
                        </div>
                        <div className="landing-groups-div">
                            {nearbyGroups.map(group => (
                                <GroupIndexItem key={group.id} group={group}/>
                            ))}
                        </div>
                        <h4 className="landing-location-h4">Events in {this.state.selectedLocation}</h4>
                        <div className="landing-events-div">
                            {nearbyEvents.map(event => (
                                <EventIndexItem key={event.id} event={event} groupName={event.name}/>
                            ))}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default GroupLanding