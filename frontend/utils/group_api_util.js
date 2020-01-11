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
        url: `/api/groups/`,
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

export const updateMembership = (membership) => (
    $.ajax({
        url: `/api/groups/${membership.groupId}/memberships/${membership.id}`,
        method: "PATCH",
        data: {membership}
    })
)

export const deleteMembership = (groupId) => (
    $.ajax({
        url: `/api/groups/${groupId}/memberships/1`,
        method: "DELETE",
        data: {groupId}
    })
)

export const createType = (type) => (
    $.ajax({
        url: `/api/groups/${type.group_id}/types`,
        method: "POST",
        data: {type}
    })
)

export const deleteType = (type) => (
    $.ajax({
        url: `/api/groups/${type.group_id}/types/1`,
        method: "DELETE",
        data: {type}
    })
)

export const searchGroups = (searchQuery) => (
    $.ajax({
      method: "GET",
      url: "/api/groups/search",
      data: {search_query: searchQuery}
    })
)