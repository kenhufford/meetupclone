import * as APIUtils from '../utils/reservation_api_utils'

export const RECEIVE_RESERVATIONS = "RECEIVE_RESERVATIONS";

const receiveReservations = (reservations) => ({
    type: RECEIVE_RESERVATIONS,
    reservations
})

export const createReservation = groupId => dispatch => (
    APIUtils.createReservation(groupId)
        .then( (reservations) => dispatch(receiveReservations(reservations)))
)

export const deleteReservation = groupId => dispatch => (
    APIUtils.deleteReservation(groupId)
        .then( (reservations) => dispatch(receiveReservations(reservations)))
)

export const updateReservation = memberType => dispatch => (
    APIUtils.updateReservation(memberType)
        .then( (reservations) => dispatch(receiveReservations(reservations)))
)

export const fetchReservations = (eventId) => dispatch => (
    APIUtils.fetchReservations(eventId)
        .then( (reservations) => dispatch(receiveReservations(reservations)))
)