export const fetchCategories = () => (
    $.ajax({
        url: `/api/categories/`,
        method: "GET"
    })
)