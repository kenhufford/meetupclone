
export const fetchMemberships = (groupId) => (
    $.ajax({
        url: `/api/groups/${groupId}/memberships`,
        method: "GET"
    })
)

export const createMembership = (groupId) => (
    $.ajax({
        url: `/api/groups/${groupId}/memberships`,
        method: "POST"
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
        method: "DELETE"
    })
)