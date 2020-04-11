import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/user_actions';
import UserShow from './user_show';

const mapStateToProps = (state, ownProps) => {
    let currentUserId = state.session.id === undefined ? null : state.session.id;
    return {
        currentUserId: currentUserId,
        userId: ownProps.match.params.userId,
        users: state.entities.users
    };
};

const mapDispatchToProps = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
