import {connect} from 'react-redux'
import CreateEventForm from './create_event_form'
import {createEvent} from '../../../actions/event_actions'
import {updateReservation} from '../../../actions/reservation_actions'
import {fetchLocations} from '../../../actions/location_actions'

const mstp = (state, ownProps) => {
    let locations = Object.values(state.entities.locations)
    return {
        event: {
            title: '',
            description: '',
            maxAttendance: '',
            startTime: "theDate",
            endTime: "theTomorrow",
            locationId: '',
            address: '',
            imageUrl: '',
            groupId: ownProps.match.params.groupId
        },
        locations: locations,
        eventId: "",
        selectedLocation: "",
    }
}

const mdtp = dispatch => ({
    action: (event) => dispatch(createEvent(event)),
    updateReservation: (membership) => dispatch(updateReservation(membership)),
    fetchLocations: () => dispatch(fetchLocations())
})

export default connect(mstp, mdtp)(CreateEventForm)