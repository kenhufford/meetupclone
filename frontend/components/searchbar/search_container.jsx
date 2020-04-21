import {connect} from 'react-redux';
import Search from './search';
import {searchGroups, fetchGroupsFromCategory, fetchGroupsFromLocation} from '../../actions/group_actions'
import {searchEvents, fetchEventsFromLocation} from '../../actions/event_actions'
import {fetchLocations} from '../../actions/location_actions'
import {fetchCategories} from '../../actions/category_actions'

const mstp = state => ({
    groups: state.entities.groups,
    locations: state.entities.locations,
    categories: state.entities.categories,
    events: state.entities.events,
})

const mdtp = dispatch => {
    
    return {
    searchGroups: (searchQuery) => dispatch(searchGroups(searchQuery)),
    searchEvents: (searchQuery) => dispatch(searchEvents(searchQuery)),
    fetchGroupsFromLocation: (locationId) => dispatch(fetchGroupsFromLocation(locationId)),
    fetchGroupsFromCategory: (categoryId) => dispatch(fetchGroupsFromCategory(categoryId)),
    fetchEventsFromLocation: (locationId) => dispatch(fetchEventsFromLocation(locationId)),
    fetchLocations: () => dispatch(fetchLocations()),
    fetchCategories: () => dispatch(fetchCategories()),
}}

export default connect (mstp, mdtp)(Search)