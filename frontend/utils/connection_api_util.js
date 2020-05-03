export const createConnectionAPI = (connection) => (
    $.ajax({
        url: `api/connections/`,
        method: "POST",
        data: {connection}
    })
)

export const deleteConnectionAPI = (rivalId) => (
    $.ajax({
        url: `/api/connections/${rivalId}`,
        method: "DELETE",
    })
)
