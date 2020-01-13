import { connect } from 'react-redux';
import GroupIndex from './group_index';
import {fetchGroups} from '../../actions/group_actions'
import {fetchUser} from '../../actions/user_actions'
import {fetchCategories} from '../../actions/category_actions'

const mapStateToProps = (state) => {
    let userId = state.session.id
    if (userId && state.entities.users[userId]){
        return {
            groups: state.entities.groups,
            currentUserId: userId,
            currentUsersGroupIds: state.entities.users[userId].groupIds,
            categories: state.entities.categories
            }
    } else {
        return {groups: state.entities.groups,
                currentUserId: "",
                currentUserLat: "",
                currentUserLong: "",
                currentUsersGroups: [],
                categories: {}
            }
    }
}

const mapDispatchToProps = dispatch => ({
    fetchGroups: (filter) => dispatch(fetchGroups(filter)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupIndex);
