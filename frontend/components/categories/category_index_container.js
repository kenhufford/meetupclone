import { connect } from 'react-redux';
import CategoryIndex from './category_index';
import {fetchCategories} from '../../actions/category_actions'

const mapStateToProps = (state) => {
    return {
        categories: state.entities.categories
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndex);
