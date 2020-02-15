import { connect } from 'react-redux';
import EventIndex from './event_index';
import {fetchEvents} from '../../actions/event_actions'
import {fetchGroups} from '../../actions/group_actions'
import {fetchLocations} from '../../actions/location_actions'
import {fetchReservations} from '../../actions/reservation_actions'

const mapStateToProps = (state) => {
    return {
        groups: state.entities.groups,
        reservations: state.entities.reservations,
        events: state.entities.events,
        locations: state.entities.locations
    }
}

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    fetchGroups: () => dispatch(fetchGroups()),
    fetchReservations: (eventId) => dispatch(fetchReservations(eventId)),
    fetchLocations: (eventId) => dispatch(fetchLocations(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex);
