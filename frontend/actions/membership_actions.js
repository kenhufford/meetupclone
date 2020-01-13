import * as APIUtils from '../utils/membership_api_utils'

export const RECEIVE_MEMBERSHIPS = "RECEIVE_MEMBERSHIPS";

const receiveMemberships = (memberships) => ({
    type: RECEIVE_MEMBERSHIPS,
    memberships
})

export const createMembership = groupId => dispatch => (
    APIUtils.createMembership(groupId)
        .then( (memberships) => dispatch(receiveMemberships(memberships)))
)

export const deleteMembership = groupId => dispatch => (
    APIUtils.deleteMembership(groupId)
        .then( (memberships) => dispatch(receiveMemberships(memberships)))
)

export const updateMembership = memberType => dispatch => (
    APIUtils.updateMembership(memberType)
        .then( (memberships) => dispatch(receiveMemberships(memberships)))
)

export const fetchMemberships = (groupId) => dispatch => (
    APIUtils.fetchMemberships(groupId)
        .then( (memberships) => dispatch(receiveMemberships(memberships)))
)