import { connect } from 'react-redux';
import {fetchGroup, deleteGroup} from '../../../actions/group_actions'
import {createMembership, deleteMembership, fetchMemberships} from '../../../actions/membership_actions'
import {fetchLocations} from '../../../actions/location_actions'
import {fetchEventsFromGroup} from '../../../actions/event_actions'
import {fetchUser, fetchUsersFromGroup} from '../../../actions/user_actions'
import GroupShow from './group_show'

const mapStateToProps = (state, ownProps) => {
    return {
        group: state.entities.groups[ownProps.match.params.groupId],
        locations: state.entities.locations,
        events: state.entities.events,
        users: state.entities.users,
        session: state.session,
        memberships: state.entities.memberships,
        currentUser: !!state.session.id,
    }
}


const mapDispatchToProps = dispatch => {
   return {
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    deleteGroup: (groupId) => dispatch(deleteGroup(groupId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchUsersFromGroup: (userId) => dispatch(fetchUsersFromGroup(userId)),
    createMembership: (groupId) => dispatch(createMembership(groupId)),
    deleteMembership: (groupId) => dispatch(deleteMembership(groupId)),
    fetchMemberships: (groupId) => dispatch(fetchMemberships(groupId)),
    fetchLocations: () => dispatch(fetchLocations()),
    fetchEventsFromGroup: (groupId) => dispatch(fetchEventsFromGroup(groupId))
}};

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);
