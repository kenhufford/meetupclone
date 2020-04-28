import { RECEIVE_GROUP_CHANNELS, RECEIVE_CHANNEL} from '../actions/channel_actions'

const channelsReducer = (state={}, action) => {
    let nextState = Object.assign({}, state)
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_GROUP_CHANNELS:
            return action.channels
        case RECEIVE_CHANNEL:
            if(action.channel.dm){
                nextState["userChannels"][action.channel.id] = action.channel
            } else {
                nextState["groupChannels"][action.channel.id] = action.channel
            }
            
            return nextState;
        default:
            return state;
    }
}

export default channelsReducer;