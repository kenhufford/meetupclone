
export const fetchReservations = (eventId) => (
    $.ajax({
        url: `/api/events/${eventId}/reservations`,
        method: "GET"
    })
)

export const createReservation = (eventId) => (
    $.ajax({
        url: `/api/events/${eventId}/reservations`,
        method: "POST"
    })
)

export const updateReservation = (reservation) => (
    $.ajax({
        url: `/api/events/${reservation.eventId}/reservations/${reservation.id}`,
        method: "PATCH",
        data: {reservation}
    })
)

export const deleteReservation = (eventId) => (
    $.ajax({
        url: `/api/events/${eventId}/reservations/1`,
        method: "DELETE"
    })
)