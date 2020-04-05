import {connect} from 'react-redux'
import CreateGroupForm from './create_group_form'
import {createGroup} from '../../../actions/group_actions'
import {createType} from '../../../actions/group_actions'
import {updateMembership} from '../../../actions/membership_actions'
import {fetchCategories} from '../../../actions/category_actions'
import {fetchLocations} from '../../../actions/location_actions'

const mstp = (state) => {
    let locations = Object.values(state.entities.locations)
    let categories = Object.values(state.entities.categories)
    return {
        group: {
            name: '',
            description: '',
            lat: '',
            long: '',
            imageUrl: '',
            selectedLocationId: '',
            selectedLocation: "Select Location",
            categoryIds: []
        },
        locations: locations,
        categories: categories,
        categorySelected: false
    }
}

const mdtp = dispatch => ({
    action: (group) => dispatch(createGroup(group)),
    updateMembership: (membership) => dispatch(updateMembership(membership)),
    createType: (type) => dispatch(createType(type)),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchLocations: () => dispatch(fetchLocations())
})

export default connect(mstp, mdtp)(CreateGroupForm)