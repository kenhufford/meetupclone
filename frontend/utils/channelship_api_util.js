export const fetchChannelships = (channel) => (
    $.ajax({
        url: `/api/groups/${channel.group_id}/channels/${channel.id}/channelships`,
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

export const deleteChannelship = (channelship) => (
    $.ajax({
        url: `/api/groups/${channelship.group_id}/channels/${channelship.channel_id}/channelships/${channelship.id}`,
        method: "DELETE",
    })
)
