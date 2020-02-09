export const fetchChannelMessages = (channel) => (
    $.ajax({
        url: `/api/groups/${channel.group_id}/channels/${channel.id}/messages`,
        method: "GET"
    })
)

export const createMessage = (message) => (
    $.ajax({
        url: `/api/groups/${message.group_id}/channels/${message.channel_id}/messages`,
        method: "POST",
        data: {message}
    })
)

export const deleteMessage = (message) => (
    $.ajax({
        url: `/api/groups/${message.group_id}/channels/${message.channel_id}/messages/${message.id}`,
        method: "DELETE",
    })
)
