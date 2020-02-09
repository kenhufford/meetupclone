export const fetchChannelships = (channel) => (
    $.ajax({
        url: `/api/groups/${channel.groupId}/channels/${channel.id}/channelships`,
        method: "GET"
    })
)

export const createChannelship = (channelship) => (
    $.ajax({
        url: `/api/groups/${channelship.groupId}/channels/${channelship.channelId}/channelships`,
        method: "POST",
        data: {channelship}
    })
)

export const deleteChannelship = (channelship) => (
    $.ajax({
        url: `/api/groups/${channelship.groupId}/channels/${channelship.channelId}/channelships/${channelship.id}`,
        method: "DELETE",
    })
)
