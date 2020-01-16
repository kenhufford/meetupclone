import {connect} from 'react-redux'
import CreateEventForm from './create_event_form'
import {createEvent} from '../../actions/event_actions'
import {updateReservation} from '../../actions/reservation_actions'
import {fetchLocations} from '../../actions/location_actions'

const mstp = (state, ownProps) => {
    let locations = Object.values(state.entities.locations)
    return {
        event: {
            title: '',
            description: '',
            maxAttendance: '',
            startTime: '',
            endTime: '',
            locationId: '',
            selectedLocation: "Select Location",
            imageUrl: '',
            groupId: ownProps.match.params.groupId
        },
        locations: locations,
    }
}

const mdtp = dispatch => ({
    action: (event) => dispatch(createEvent(event)),
    updateReservation: (membership) => dispatch(updateReservation(membership)),
    fetchLocations: () => dispatch(fetchLocations())
})

export default connect(mstp, mdtp)(CreateEventForm)