export const fetchGroups = (filters) => (
    $.ajax({
        url: '/api/groups/',
        method: "GET",
        filters
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