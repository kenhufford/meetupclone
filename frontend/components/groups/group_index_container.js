import { connect } from 'react-redux';
import GroupIndex from './group_index';
import {fetchGroups} from '../../actions/group_actions'
import {fetchUser} from '../../actions/user_actions'
import {fetchCategories} from '../../actions/category_actions'

const mapStateToProps = (state) => {
    let userId = state.session.id
    let {memberships, groups} = state.entities
    let currentUsersGroups = []
    
    if (memberships.userMemberships!==undefined){
        memberships.userMemberships.map( membership =>{
            currentUsersGroups.push(groups[membership.groupId])
        })
    }
    return {
        groups: state.entities.groups,
        currentUserId: userId,
        currentUsersGroups: currentUsersGroups,
        categories: state.entities.categories
    }
}

const mapDispatchToProps = dispatch => ({
    fetchGroups: (filter) => dispatch(fetchGroups(filter)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchMemberships: (groupId) => dispatch(fetchMemberships(groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupIndex);
