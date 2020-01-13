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

export const fetchUsers = () => dispatch => (
    APIUtils.fetchUsers()
        .then(users => dispatch(receiveUsers(users)))
)
