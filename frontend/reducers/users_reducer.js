import {RECEIVE_USER, RECEIVE_USERS} from '../actions/user_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

  
  
  const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_CURRENT_USER:
        return { [action.currentUser.id]: action.currentUser };
      case RECEIVE_USER:
        return { [action.user.id]: action.user };
      case RECEIVE_USERS:
        return action.users;
      default:
        return state;
    }
  };
  
  export default usersReducer;
  