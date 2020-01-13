import { connect } from 'react-redux';
import {fetchGroup, createMembership, deleteMembership} from '../../actions/group_actions'
import {fetchLocations} from '../../actions/location_actions'
import {fetchEvents} from '../../actions/event_actions'
import {fetchUser} from '../../actions/user_actions'
import GroupShow from '../../components/groups/group_show'

const mapStateToProps = (state, ownProps) => {
    return {
        group: state.entities.groups[ownProps.match.params.groupId],
        locations: state.entities.locations,
        session: state.session,
        events: state.entities.events
    }
}


const mapDispatchToProps = dispatch => ({
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    createMembership: (groupId) => dispatch(createMembership(groupId)),
    deleteMembership: (groupId) => dispatch(deleteMembership(groupId)),
    fetchLocations: () => dispatch(fetchLocations()),
    fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);
