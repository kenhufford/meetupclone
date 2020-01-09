import {connect} from 'react-redux'
import EditGroupForm from './create_group_form'
import {updateGroup} from '../../actions/group_actions'
import {deleteType, createType, fetchGroup} from '../../actions/group_actions'
import {fetchCategories} from '../../actions/category_actions'
import {fetchLocations} from '../../actions/location_actions'

const mstp = (state, ownProps) => {
    let locations = Object.values(state.entities.locations)
    let categories = Object.values(state.entities.categories)
    let group = state.entities.groups[ownProps.match.params.groupId]
    let groupCat = group.categories
    for (let i = 0; i < locations.length; i++){
        locations[i].key = 'location';
        locations[i].selected = (locations.id === group.locationId)         
    }
    for (let i = 0; i < categories.length; i++){
        categories[i].key = 'category';
        categories[i].selected  = !groupCat[categories[i].id] ? false : true
    }
    console.log("edit form container!")
    return {
        group: group,
        locations: locations,
        categories: categories
    }
}

const mdtp = dispatch => ({
    action: (group) => dispatch(updateGroup(group)),
    createType: (type) => dispatch(createType(type)),
    deleteType: (type) => dispatch(deleteType(type)),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchLocations: () => dispatch(fetchLocations()),
    fetchGroup: () => dispatch(fetchGroup())
})

export default connect(mstp, mdtp)(EditGroupForm)