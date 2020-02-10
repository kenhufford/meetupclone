import * as APIUtils from '../utils/user_api_util'

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const fetchUser = (userId) => dispatch => (
    APIUtils.fetchUser(userId)
        .then(user => dispatch(receiveUser(user)))
)

export const fetchAllUsers = () => dispatch => (
    APIUtils.fetchAllUsers()
        .then(users => dispatch(receiveUsers(users)))
)

export const fetchUsersFromGroup = (groupId) => dispatch => (
    APIUtils.fetchUsersFromGroup(groupId)
        .then(users => dispatch(receiveUsers(users)))
)

export const fetchUsersFromEvent = (eventId) => dispatch => (
    APIUtils.fetchUsersFromEvent(eventId)
        .then(users => dispatch(receiveUsers(users)))
)

export const fetchUsersFromChannel = (channelId) => dispatch => (
    APIUtils.fetchUsersFromChannel(channelId)
        .then(users => dispatch(receiveUsers(users)))
)
