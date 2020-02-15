export const fetchChannelships = (channel) => (
    $.ajax({
        url: `/api/groups/${channel.groupId}/channels/${channel.id}/channelships`,
        method: "GET"
    })
)

export const fetchChannelshipsFromUser = () => (
    $.ajax({
        url: `/api/channelships`,
        method: "GET"
    })
)

export const createChannelship = (channelship) => (
    $.ajax({
        url: `/api/groups/${channelship.group_id}/channels/${channelship.channel_id}/channelships`,
        method: "POST",
        data: {channelship}
    })
)

export const updateChannelship = (channelship) => (
    $.ajax({
        url: `/api/channelships/${channelship.channel_id}`,
        method: "PATCH",
        data: { channelship}
    })
)

export const deleteChannelship = (channelshipId) => (
    $.ajax({
        url: `/api/channelships/${channelshipId}`,
        method: "DELETE",
    })
)
