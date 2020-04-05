import { connect } from 'react-redux';
import EventShow from './event_show';
import {fetchEvent, deleteEvent} from '../../../actions/event_actions'
import {fetchGroup} from '../../../actions/group_actions'
import {fetchLocations} from '../../../actions/location_actions'
import {fetchUsersFromEvent} from '../../../actions/user_actions'
import {fetchReservations, createReservation, deleteReservation} from '../../../actions/reservation_actions'

const mapStateToProps = (state, ownProps) => {
    let eventId = ownProps.match.params.eventId;
    let groupId = ownProps.match.params.groupId;
    let currentUserId;
    if (!!state.session.id){currentUserId = state.session.id}
    return {
        event: state.entities.events[eventId],
        group: state.entities.groups[groupId],
        reservations: state.entities.reservations,
        locations: state.entities.locations,
        users: state.entities.users,
        currentUser: !!state.session.id,
        currentUserId: currentUserId
    }
}

const mapDispatchToProps = dispatch => ({
    fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    fetchReservations: (eventId) => dispatch(fetchReservations(eventId)),
    fetchLocations: () => dispatch(fetchLocations()),
    fetchUsersFromEvent: (eventId) => dispatch(fetchUsersFromEvent(eventId)),
    createReservation: (eventId) => dispatch(createReservation(eventId)),
    deleteReservation: (eventId) => dispatch(deleteReservation(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
