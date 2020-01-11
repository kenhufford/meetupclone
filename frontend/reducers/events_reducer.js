import {RECEIVE_ALL_EVENTS, RECEIVE_EVENT, REMOVE_EVENT} from '../actions/event_actions'

const eventsReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_EVENTS:
            return action.events
        case RECEIVE_EVENT:
            return { [action.event.id]: action.event };
        case REMOVE_EVENT:
            delete nextState[action.eventId] 
            return nextState;
        default:
            return state;
    }
}

export default eventsReducer;