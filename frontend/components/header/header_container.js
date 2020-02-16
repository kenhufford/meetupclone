import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchMemberships} from '../../actions/membership_actions';
import Header from './header';

const mapStateToProps = (state) => {
  let currentUser = state.session.id===undefined ? false:true
  return {
    currentUser: currentUser
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchMemberships: (groupId) => dispatch(fetchMemberships(groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
