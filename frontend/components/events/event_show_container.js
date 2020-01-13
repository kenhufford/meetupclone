import { connect } from 'react-redux';
import EventShow from './event_show';
import {fetchEvent,createReservation, deleteReservation} from '../../actions/event_actions'
import {fetchGroup} from '../../actions/group_actions'
import {fetchLocations} from '../../actions/location_actions'

const mapStateToProps = (state, ownProps) => {
    let userId = state.session.id;
    let eventId = ownProps.match.params.eventId;
    let groupId = ownProps.match.params.groupId;
    return {
        event: state.entities.events[eventId],
        group: state.entities.groups[groupId],
        currentUserId: userId
    }
}

const mapDispatchToProps = dispatch => ({
    fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    fetchLocations: () => dispatch(fetchLocations()),
    createReservation: (eventId) => dispatch(createReservation(eventId)),
    deleteReservation: (eventId) => dispatch(deleteReservation(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
