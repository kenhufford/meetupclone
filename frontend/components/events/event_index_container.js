import { connect } from 'react-redux';
import EventIndex from './event_index';
import {fetchEvents} from '../../actions/event_actions'
import {fetchGroups} from '../../actions/group_actions'
import {fetchUser} from '../../actions/user_actions'
import {fetchReservations} from '../../actions/reservation_actions'

const mapStateToProps = (state) => {
    return {
        groups: state.entities.groups,
        reservations: state.entities.reservations,
        events: state.entities.events
    }
}

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    fetchGroups: () => dispatch(fetchGroups()),
    fetchReservations: (eventId) => dispatch(fetchReservations(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex);
