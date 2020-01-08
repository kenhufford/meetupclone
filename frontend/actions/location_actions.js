import * as APIUtils from '../utils/location_api_util'

export const RECEIVE_LOCATIONS = "RECEIVE_LOCATIONS";

const receiveLocations = locations => ({
    type: RECEIVE_LOCATIONS,
    locations
})

export const fetchLocations = () => dispatch => (
    APIUtils.fetchLocations()
        .then( locations => dispatch(receiveLocations(locations)))
)