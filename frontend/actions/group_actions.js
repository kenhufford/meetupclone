import * as APIUtils from '../utils/group_api_util'

export const RECEIVE_GROUPS = "RECEIVE_GROUPS";
export const RECEIVE_GROUP = "RECEIVE_GROUP";
export const REMOVE_GROUP = "REMOVE_GROUP";

const receiveGroups = (groups) => ({
    type: RECEIVE_GROUPS,
    groups
})

const receiveGroup = (group) => ({
    type: RECEIVE_GROUP,
    group
})
const removeGroup = (groupId) => ({
    type: REMOVE_GROUP,
    groupId
})

export const fetchGroups = (filters) => dispatch => (
    APIUtils.fetchGroups(filters)
        .then( (groups) => dispatch(receiveGroups(groups)))
)

export const fetchGroup = (groupId) => dispatch => (
    APIUtils.fetchGroup(groupId)
        .then( (group) => dispatch(receiveGroup(group)))
)

export const createGroup = (group) => dispatch => (
    APIUtils.createGroup(group)
        .then( (createdGroup) => dispatch(receiveGroup(createdGroup)))
)

export const updateGroup = (group) => dispatch => (
    APIUtils.updateGroup(group)
        .then( (updatedGroup) => dispatch(receiveGroup(updatedGroup)))
)

export const deleteGroup = (groupId) => dispatch => (
    APIUtils.deleteGroup(groupId)
        .then( () => dispatch(removeGroup(groupId)))
)

export const createMembership = groupId => dispatch => (
    APIUtils.createMembership(groupId)
        .then( (updatedGroup) => dispatch(receiveGroup(updatedGroup)))
)

export const deleteMembership = groupId => dispatch => (
    APIUtils.deleteMembership(groupId)
        .then( (updatedGroup) => dispatch(receiveGroup(updatedGroup)))
)