import {connect} from 'react-redux'
import CreateGroupForm from './create_group_form'
import {createGroup} from '../../actions/group_actions'
import {createMembership, updateMembership} from '../../actions/group_actions'

const mstp = (state) => ({
})

const mdtp = dispatch => ({
    createGroup: (group) => dispatch(createGroup(group)),
    createMembership: (groupId) => dispatch(createMembership(groupId)),
    createMembership: (membership) => dispatch(updateMembership(membership))

})

export default connect(mstp, mdtp)(CreateGroupForm)