import {RECEIVE_USER} from '../actions/user_actions';
import {RECEIVE_CURRENT_USER} from '../actions/session_actions';

  
  
  const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_CURRENT_USER:
        return { [action.currentUser.id]: action.currentUser };
      case RECEIVE_USER:
        console.log("im receiving a user")
        return { [action.user.id]: action.user };
      default:
        return state;
    }
  };
  
  export default usersReducer;
  