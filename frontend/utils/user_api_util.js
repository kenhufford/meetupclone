export const fetchUser = (userId) => (
    $.ajax({
        url: `/api/users/${userId}`,
        method: "GET"
    })
)

export const fetchAllUsers = (id) => (
    $.ajax({
        url: `/api/users/`,
        method: "GET"
    })
)

export const fetchUsersFromGroup = (groupId) => (
    $.ajax({
        url: `/api/groups/${groupId}/users`,
        method: "GET"
    })
)

export const fetchUsersFromEvent = (eventId) => (
    $.ajax({
        url: `/api/events/${eventId}/users`,
        method: "GET"
    })
)

export const fetchUsersFromChannel = (channelId) => (
    $.ajax({
        url: `/api/channels/${channelId}/users`,
        method: "GET"
    })
)