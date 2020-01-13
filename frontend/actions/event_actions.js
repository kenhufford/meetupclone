import * as APIUtils from '../utils/event_api_util'

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";

const receiveEvents = (events) => ({
    type: RECEIVE_EVENTS,
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

export const fetchEvents = () => dispatch => (
    APIUtils.fetchEvents()
        .then(events => dispatch(receiveEvents(events)))
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

export const createReservation = eventId => dispatch => (
    APIUtils.createReservation(eventId)
        .then( (updatedEvent) => dispatch(receiveEvent(updatedEvent)))
)

export const deleteReservation = eventId => dispatch => (
    APIUtils.deleteReservation(eventId)
        .then( (updatedEvent) => dispatch(receiveEvent(updatedEvent)))
)
