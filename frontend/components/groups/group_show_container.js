import { connect } from 'react-redux';
import GroupIndex from './group_index';
import {fetchGroup} from '../../actions/group_actions'
import {fetchUser} from '../../actions/user_actions'
import GroupShow from '../../components/groups/group_show'

const mapStateToProps = (state, ownProps) => ({
   group: state.entities.groups[ownProps.match.params.groupId]
})

const mapDispatchToProps = dispatch => ({
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    fetchUser: (userId) => dispatch(fetchUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);
