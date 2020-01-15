import {connect} from 'react-redux';
import Search from './search';
import {searchGroups} from '../../actions/group_actions'
import {searchEvents} from '../../actions/event_actions'

const mstp = state => ({
    groups: Object.values(state.entities.groups)
})

const mdtp = dispatch => ({
    searchGroups: (searchQuery) => dispatch(searchGroups(searchQuery)),
    searchEvents: (searchQuery) => dispatch(searchEvents(searchQuery)),
})

export default connect (mstp, mdtp)(Search)