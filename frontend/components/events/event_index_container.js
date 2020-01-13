import { connect } from 'react-redux';
import EventIndex from './event_index';
import {fetchEvents} from '../../actions/event_actions'
import {fetchGroups} from '../../actions/group_actions'
import {fetchUser} from '../../actions/user_actions'

const mapStateToProps = (state) => {
    let currentUsersEventsIds = []
    let userId = state.session.id;
    if (userId) {
        currentUsersEventsIds = state.entities.users[userId].events
    }
    return {
        groups: state.entities.groups,
        events: state.entities.events,
        currentUserId: userId,
        currentUsersEventsIds: currentUsersEventsIds
    }

}

const mapDispatchToProps = dispatch => ({
    fetchEvents: () => dispatch(fetchEvents()),
    fetchGroups: () => dispatch(fetchGroups()),
    fetchUser: (userId) => dispatch(fetchUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex);
