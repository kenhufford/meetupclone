export const CLEAR_ERRORS = "CLEAR_ERRORS";

const clearErrorsInReducer = () => ({
    type: CLEAR_ERRORS
})

export const clearErrors = () => dispatch => dispatch(clearErrorsInReducer());