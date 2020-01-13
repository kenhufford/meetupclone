import {RECEIVE_MEMBERSHIPS} from '../actions/membership_actions'

const membershipsReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MEMBERSHIPS:
            return action.memberships
        default:
            return state;
    }
}

export default membershipsReducer;