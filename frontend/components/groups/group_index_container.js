import { connect } from 'react-redux';
import GroupIndex from './group_index';
import {fetchAllGroups} from '../../actions/group_actions'
import {fetchUser} from '../../actions/user_actions'

const mapStateToProps = (state) => {
    if (state.session.id){
        return {groups: state.entities.groups,
                currentUserId: state.session.id,
                userGroupIds: state.entities.users[state.session.id].memberships}
    } else {
        return {groups: state.entities.groups,
                currentUserId: undefined,
                userGroupIds: []}
    }
}

const mapDispatchToProps = dispatch => ({
    fetchAllGroups: () => dispatch(fetchAllGroups()),
    fetchUser: (userId) => dispatch(fetchUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupIndex);
