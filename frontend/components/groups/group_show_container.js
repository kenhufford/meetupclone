import { connect } from 'react-redux';
import {fetchGroup, createMembership, deleteMembership} from '../../actions/group_actions'
import {fetchUser} from '../../actions/user_actions'
import GroupShow from '../../components/groups/group_show'

const mapStateToProps = (state, ownProps) => {
    return {
        group: state.entities.groups[ownProps.match.params.groupId],
        session: state.session
    }
}


const mapDispatchToProps = dispatch => ({
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    createMembership: (groupId) => dispatch(createMembership(groupId)),
    deleteMembership: (groupId) => dispatch(deleteMembership(groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);
