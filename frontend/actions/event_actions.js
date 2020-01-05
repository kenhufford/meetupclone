import * as APIUtils from '../utils/event_api_util'

export const RECEIVE_ALL_EVENTS = "RECEIVE_ALL_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";

const receiveAllEvents = (events) => ({
    type: RECEIVE_ALL_EVENTS,
    events
})

const receiveEvent = (event) => ({
    type: RECEIVE_EVENT,
    event
})

const removeEvent = (eventId) => ({
    type: REMOVE_EVENT,
    eventId
})

export const fetchAllEvents = () => dispatch => (
    APIUtils.fetchAllEvents()
        .then(events => dispatch(receiveAllEvents(events)))
)

export const fetchEvent = (eventId) => dispatch => (
    APIUtils.fetchEvent(eventId)
        .then(event => dispatch(receiveEvent(event)))
)

export const createEvent = (event) => dispatch => (
    APIUtils.createEvent(event)
        .then(createdEvent => dispatch(receiveEvent(createdEvent)))
)

export const updateEvent = (event) => dispatch => (
    APIUtils.updateEvent(event)
        .then(updatedEvent => dispatch(receiveEvent(updatedEvent)))
)

export const deleteEvent = (eventId) => dispatch => (
    APIUtils.deleteEvent(eventId)
        .then(() => dispatch(removeEvent(eventId)))
)
