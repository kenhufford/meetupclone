import * as APIUtils from '../utils/message_api_util'

export const RECEIVE_CHANNEL_MESSAGES = "RECEIVE_CHANNEL_MESSAGES";

const receiveChannelMessages = messages => ({
    type: RECEIVE_CHANNEL_MESSAGES,
    messages
})

export const fetchChannelMessages = (channel) => dispatch => (
    APIUtils.fetchChannelMessages(channel)
        .then(messages => dispatch(receiveChannelMessages(messages)))
)

export const createMessage = (message) => dispatch => (
    APIUtils.createMessage(message)
        .then(messages => dispatch(receiveChannelMessages(messages)))
)

export const deleteMessage = (message) => dispatch => (
    APIUtils.deleteMessage(message)
        .then(messages => dispatch(receiveChannelMessages(messages)))
)
