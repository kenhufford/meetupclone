import { connect } from 'react-redux';
import GroupLanding from './group_landing';
import {fetchGroups} from '../../actions/group_actions'

const mapStateToProps = (state) => ({
    groups: state.entities.groups
})

const mapDispatchToProps = dispatch => ({
    fetchGroups: (filter) => dispatch(fetchGroups(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupLanding);
