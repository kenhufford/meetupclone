import {connect} from 'react-redux'
import CreateGroupForm from './create_group_form'
import {createGroup} from '../../actions/group_actions'
import {createMembership, updateMembership} from '../../actions/group_actions'

const mstp = (state) => ({
    group: {
        name: '',
        description: '',
        lat: '',
        long: '',
        imageUrl: ''
    }
})

const mdtp = dispatch => ({
    action: (group) => dispatch(createGroup(group)),
    createMembership: (groupId) => dispatch(createMembership(groupId)),
    updateMembership: (membership) => dispatch(updateMembership(membership))
})

export default connect(mstp, mdtp)(CreateGroupForm)