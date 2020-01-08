export const fetchLocations = () => (
    $.ajax({
        url: `/api/locations/`,
        method: "GET"
    })
)