// import * as APIUtil from '../utils/membership_api_util'

// export const RECEIVE_MEMBERSHIP = "RECEIVE_MEMBERSHIP";
// export const REMOVE_MEMBERSHIP = "REMOVE_MEMBERSHIP";


// const receiveMembership = (membership) => ({
//     type: RECEIVE_MEMBERSHIP,
//     membership
// })

// const removeMembership = membershipIds => ({
//     type: REMOVE_MEMBERSHIP,
//     membershipIds
// })

// export const createMembership = membership => dispatch => (
//     APIUtil.createMembership(membership)
//         .then( (createdMembership) => dispatch(receiveMembership(createdMembership)))
// )

// export const deleteMembership = membershipId => dispatch => (
//     APIUtil.deleteMembership(membershipId)
//         .then( () => dispatch(removeMembership(membershipId)))
// )