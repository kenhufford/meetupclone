import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/user_actions';
import { fetchGroupsFromUser } from '../../../actions/group_actions';
import { fetchEventsFromUser } from '../../../actions/event_actions';
import { fetchUsersFromGroup, fetchUsersFromEvent } from '../../../actions/user_actions';
import { deleteConnection, createConnection } from '../../../actions/session_actions';
import UserShow from './user_show';

const mapStateToProps = (state, ownProps) => {
    let currentUserId = state.session.id === undefined ? null : state.session.id;
    return {
        currentUserId: currentUserId,
        currentUser: state.session,
        userId: ownProps.match.params.userId,
        users: state.entities.users,
        groups: state.entities.groups,
        events: state.entities.events
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchGroupsFromUser: (userId) => dispatch(fetchGroupsFromUser(userId)),
    fetchEventsFromUser: (userId) => dispatch(fetchEventsFromUser(userId)),
    fetchUsersFromGroup: (groupId) => dispatch(fetchUsersFromGroup(groupId)),
    fetchUsersFromEvent: (eventId) => dispatch(fetchUsersFromEvent(eventId)),
    deleteConnection: (rivalId) => dispatch(deleteConnection(rivalId)),
    createConnection: (connection) => dispatch(createConnection(connection)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
