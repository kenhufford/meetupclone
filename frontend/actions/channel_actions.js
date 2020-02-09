import * as APIUtils from '../utils/channel_api_util'

export const RECEIVE_GROUP_CHANNELS = "RECEIVE_GROUP_CHANNELS";

const receiveGroupChannels = channels => ({
    type: RECEIVE_GROUP_CHANNELS,
    channels
})

export const fetchGroupChannels = (groupId) => dispatch => (
    APIUtils.fetchGroupChannels(groupId)
        .then(channels => dispatch(receiveGroupChannels(channels)))
)

export const createChannel = (channel) => dispatch => (
    APIUtils.createChannel(channel)
        .then(channels => dispatch(receiveGroupChannels(channels)))
)

export const deleteChannel = (channel) => dispatch => (
    APIUtils.deleteChannel(channel)
        .then(channels => dispatch(receiveGroupChannels(channels)))
)
