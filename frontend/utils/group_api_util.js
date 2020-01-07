export const fetchGroups = (data) => (
    $.ajax({
        url: '/api/groups/',
        method: "GET",
        data
    })
)

export const fetchGroup = (groupId) => (
    $.ajax({
        url: `/api/groups/${groupId}`,
        method: "GET",
    })
)

export const createGroup = (group) => (
    $.ajax({
        url: `/api/groups/${group.id}`,
        method: "POST",
        data: {group}
    })
)

export const updateGroup = (group) => (
    $.ajax({
        url: `/api/groups/${group.id}`,
        method: "PATCH",
        data: {group}
    })
)

export const deleteGroup = (groupId) => (
    $.ajax({
        url: `/api/groups/${groupId}`,
        method: "DELETE"
    })
)
export const createMembership = (groupId) => (
    $.ajax({
        url: `/api/groups/${groupId}/memberships`,
        method: "POST",
        data: {groupId}
    })
)

export const deleteMembership = (groupId) => (
    $.ajax({
        url: `/api/groups/${groupId}/memberships/1`,
        method: "DELETE",
        data: {groupId}
    })
)