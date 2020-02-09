import * as APIUtils from '../utils/channelship_api_util'

export const RECEIVE_CHANNELSHIPS = "RECEIVE_CHANNELSHIPS";

const receiveChannelships = channelships => ({
    type: RECEIVE_CHANNELSHIPS,
    channelships
})

export const fetchChannelships = (channel) => dispatch => (
    APIUtils.fetchChannelships(channel)
        .then(channelships => dispatch(receiveChannelships(channelships)))
)

export const createChannelship = (channelship) => dispatch => (
    APIUtils.createChannelship(channelship)
        .then(channelships => dispatch(receiveChannelships(channelships)))
)

export const deleteChannelship = (channelship) => dispatch => (
    APIUtils.deleteChannelship(channelship)
        .then(channelships => dispatch(receiveChannelships(channelships)))
)
