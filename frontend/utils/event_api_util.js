export const fetchEvents = () => (
    $.ajax({
        url: '/api/events',
        method: "GET"
    })
)

export const fetchEvent = (eventId) => (
    $.ajax({
        url: `/api/events/${eventId}`,
        method: "GET"
    })
)

export const createEvent = (event) => (
    $.ajax({
        url: `/api/events/`,
        method: "POST",
        data: {event}
    })
)

export const updateEvent = (event) => (
    $.ajax({
        url: `/api/events/${event.id}`,
        method: "PATCH",
        data: {event}
    })
)

export const deleteEvent = (eventId) => (
    $.ajax({
        url: `/api/events/${eventId}`,
        method: "DELETE"
    })
)

export const createReservation = (eventId) => (
    $.ajax({
        url: `/api/events/${eventId}/reservations`,
        method: "POST",
        data: {eventId}
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
        method: "DELETE",
        data: {eventId}
    })
)