import {connect} from 'react-redux';
import Search from './search';
import {searchGroups} from '../../actions/group_actions'

const mstp = state => ({
    groups: Object.values(state.entities.groups)
})

const mdtp = dispatch => ({
    searchGroups: (searchQuery) => dispatch(searchGroups(searchQuery))
})

export default connect (mstp, mdtp)(Search)