export const fetchGroupChannels = (groupId) => (
    $.ajax({
        url: `/api/groups/${groupId}/channels`,
        method: "GET"
    })
)

export const createChannel = (channel) => (
    $.ajax({
        url: `/api/groups/${channel.group_id}/channels`,
        method: "POST",
        data: {channel}
    })
)

export const deleteChannel = (channel) => (
    $.ajax({
        url: `/api/groups/${channel.group_id}/channels/${channel.id}`,
        method: "DELETE",
    })
)
