import React from 'react';
import GroupIndexItem from './group_index_item'
import SearchBar from '../../components/searchbar/search_bar'
import CreateGroupFormDropdown from '../../components/groups/create_group_form_dropdown'

class GroupLanding extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedLocation: "San Francisco",
            selectedLocationId: 1,
            location: this.props.locations
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
        this.props.fetchGroups();
        this.props.fetchLocations()
        .then( (payload) => {
            this.setState({
                location: Object.values(payload.locations)
            })
        });
    }


    render(){
        if (!this.props.groups[0]) return null
        let nearbyGroups = []
        this.props.groups.map(group => {
            if (group.locationId === this.state.selectedLocationId) nearbyGroups.push(group)
        })
        return(
            <div className="group-landing">
                <div className="group-landing-banner">
                    <div className="group-landing-banner-left">
                        <h1 className="group-landing-banner-left-title">Join the ultimate brawl</h1>
                        <h3 className="group-landing-banner-left-subtitle">Find your spirit squad and enter the fray</h3>
                        <SearchBar history={this.props.history} />
                    </div>
                    <div className="group-landing-banner-right">
                        <img className="group-landing-banner-right-image" src={window.mainImageURL}/>
                    </div>
                </div>
                <div className="group-landing-groups">
                    <div className="group-landing-groups-dropdown">
                        <h4>Groups near {this.state.selectedLocation}</h4>
                        <CreateGroupFormDropdown location={this.state.selectedLocation} list={this.state.location} toggleLocation={this.toggleSelected} />
                    </div>
                    <div className="groups-div">
                        {nearbyGroups.map(group => (
                            <GroupIndexItem key={group.id} group={group}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupLanding