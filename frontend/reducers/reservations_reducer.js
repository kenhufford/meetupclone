import {RECEIVE_RESERVATIONS} from '../actions/reservation_actions'

const reservationsReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_RESERVATIONS:
            return action.reservations
        default:
            return state;
    }
}

export default reservationsReducer;