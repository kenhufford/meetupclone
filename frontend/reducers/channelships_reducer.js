import { RECEIVE_CHANNELSHIPS} from '../actions/channelship_actions'

const channelshipsReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CHANNELSHIPS:
            return action.channelships
        default:
            return state;
    }
}

export default channelshipsReducer;