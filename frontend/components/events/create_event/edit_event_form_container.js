import {connect} from 'react-redux'
import EditEventForm from './edit_event_form'
import {updateEvent, fetchEvent} from '../../../actions/event_actions'
import {fetchLocations} from '../../../actions/location_actions'

const mstp = (state, ownProps) => {
    let selectedLocation;
    let locations = Object.values(state.entities.locations)
    let event = state.entities.events[ownProps.match.params.eventId]
    for (let i = 0; i < locations.length; i++){
        locations[i].key = 'location';
        locations[i].selected = (locations[i].id === event.locationId) 
        if (event.locationId === locations[i].id) selectedLocation = locations[i].name        
    }
    return {
        event: event,
        locations: locations,
        selectedLocation: selectedLocation
    }
}

const mdtp = dispatch => ({
    action: (event) => dispatch(updateEvent(event)),
    fetchLocations: () => dispatch(fetchLocations()),
    fetchEvent: (eventId) => dispatch(fetchEvent(eventId))
})

export default connect(mstp, mdtp)(EditEventForm)