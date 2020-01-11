import { connect } from 'react-redux';
import {fetchLocations} from '../../actions/location_actions'
import {fetchGroups} from '../../actions/group_actions'
import SearchBar from '../../components/searchbar/search_bar'

const mapStateToProps = (state) => {
    return {
        locations: state.entities.locations,
    }
}


const mapDispatchToProps = dispatch => ({
    fetchGroups: (data) => dispatch(fetchGroups(data)),
    fetchLocations: () => dispatch(fetchLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
