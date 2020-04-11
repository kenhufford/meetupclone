import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchMemberships} from '../../actions/membership_actions';
import Header from './header';

const mapStateToProps = (state) => {
  let currentUser = state.session.id===undefined ? false:true;
  let currentUserId = state.session.id === undefined ? null : state.session.id;
  return {
    currentUser: currentUser,
    currentUserId: currentUserId,
    memberships: state.entities.memberships,
    userHasMemberships: state.entities.memberships.userHasMemberships
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchMemberships: (groupId) => dispatch(fetchMemberships(groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
