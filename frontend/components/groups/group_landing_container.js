import { connect } from 'react-redux';
import GroupLanding from './group_landing';
import {fetchGroups} from '../../actions/group_actions'
import {fetchLocations} from '../../actions/location_actions'

const mapStateToProps = (state) => ({
    groups: Object.values(state.entities.groups),
    locations: Object.values(state.entities.locations)
})

const mapDispatchToProps = dispatch => ({
    fetchGroups: (filter) => dispatch(fetchGroups(filter)),
    fetchLocations: () => dispatch(fetchLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupLanding);
