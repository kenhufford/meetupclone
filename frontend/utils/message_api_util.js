export const fetchChannelMessages = (channel) => (
    $.ajax({
        url: `/api/groups/${channel.groupId}/channels/${channel.id}/messages`,
        method: "GET"
    })
)

export const createMessage = (message) => (
    $.ajax({
        url: `/api/groups/${message.groupId}/channels/${message.channelId}/messages`,
        method: "POST",
        data: {message}
    })
)

export const deleteMessage = (message) => (
    $.ajax({
        url: `/api/groups/${message.groupId}/channels/${message.channelId}/messages/${message.id}`,
        method: "DELETE",
    })
)
