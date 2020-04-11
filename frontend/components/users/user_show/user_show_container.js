import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/user_actions';
import { fetchGroupsFromUser } from '../../../actions/group_actions';
import { fetchEventsFromUser } from '../../../actions/event_actions';
import UserShow from './user_show';

const mapStateToProps = (state, ownProps) => {
    let currentUserId = state.session.id === undefined ? null : state.session.id;
    return {
        currentUserId: currentUserId,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
