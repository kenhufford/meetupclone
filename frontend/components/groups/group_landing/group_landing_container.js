import { connect } from 'react-redux';
import GroupLanding from './group_landing';
import {fetchGroups} from '../../../actions/group_actions'
import {fetchLocations} from '../../../actions/location_actions'
import {fetchEvents} from '../../../actions/event_actions'

const mapStateToProps = (state) => ({
    groups: state.entities.groups,
    locations: Object.values(state.entities.locations),
    events: state.entities.events,
    currentUser: state.session
})

const mapDispatchToProps = dispatch => ({
    fetchGroups: (filter) => dispatch(fetchGroups(filter)),
    fetchLocations: () => dispatch(fetchLocations()),
    fetchEvents: () => dispatch(fetchEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupLanding);
