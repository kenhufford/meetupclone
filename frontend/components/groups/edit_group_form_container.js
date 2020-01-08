import {connect} from 'react-redux'
import EditGroupForm from './edit_group_form'
import {updateGroup} from '../../actions/group_actions'

const mstp = (state, ownProps) => {
    if (state.entities.groups[ownProps.match.params.groupId]){
        return {
            group: state.entities.groups[ownProps.match.params.groupId]
        }
    } else {
        return {
            group: {
                name: '',
                description: '',
                lat: '',
                long: '',
                imageUrl: ''
            }
        }
    }

}

const mdtp = dispatch => ({
    updateGroup: (group) => dispatch(updateGroup(group)),
    createMembership: (groupId) => dispatch(createMembership(groupId)),
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId))
})

export default connect(mstp, mdtp)(EditGroupForm)