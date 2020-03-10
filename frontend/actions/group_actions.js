import * as APIUtils from '../utils/group_api_util'

export const RECEIVE_GROUPS = "RECEIVE_GROUPS";
export const RECEIVE_GROUPS_FROM_USER = "RECEIVE_GROUPS_FROM_USER";
export const RECEIVE_GROUP = "RECEIVE_GROUP";

const receiveGroups = (groups) => ({
    type: RECEIVE_GROUPS,
    groups
})

const receiveGroupsFromUser = (groups) => ({
    type: RECEIVE_GROUPS_FROM_USER,
    groups
})

const receiveGroup = (group) => ({
    type: RECEIVE_GROUP,
    group
})


export const fetchGroups = (filters) => dispatch => (
    APIUtils.fetchGroups(filters)
        .then( (groups) => dispatch(receiveGroups(groups)))
)

export const fetchGroupsFromLocation = (locationId) => dispatch => (
    APIUtils.fetchGroupsFromLocation(locationId)
        .then( (groups) => dispatch(receiveGroups(groups)))
)

export const fetchGroupsFromCategory = (categoryId) => dispatch => (
    APIUtils.fetchGroupsFromCategory(categoryId)
        .then( (groups) => dispatch(receiveGroups(groups)))
)

export const fetchGroupsFromUser = (userId) => dispatch => (
    APIUtils.fetchGroupsFromUser(userId)
        .then((groups) => dispatch(receiveGroupsFromUser(groups)))
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
        .then( (groups) => dispatch(receiveGroups(groups)))
)


export const searchGroups = (searchQuery) => dispatch => (
    APIUtils.searchGroups(searchQuery)
        .then( (groups) => dispatch(receiveGroups(groups)))
)

export const createType = type => dispatch => (
    APIUtils.createType(type)
        .then( (updatedGroup) => dispatch(receiveGroup(updatedGroup)))
)

export const deleteType = type => dispatch => (
    APIUtils.deleteType(type)
        .then( (updatedGroup) => dispatch(receiveGroup(updatedGroup)))
)