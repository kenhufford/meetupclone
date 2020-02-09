import { RECEIVE_GROUP_CHANNELS} from '../actions/channel_actions'

const channelsReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_GROUP_CHANNELS:
            return action.channels
        default:
            return state;
    }
}

export default channelsReducer;