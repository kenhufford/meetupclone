import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';
import {createNewUser} from '../../actions/session_actions';
import {fetchLocations} from '../../actions/location_actions'

const mapStateToProps = (state) => {
    let locations = Object.values(state.entities.locations)
    for (let i = 0; i < locations.length; i++){
        locations[i].key = 'location';
        locations[i].selected = false;     
    }
    return {
        errors: state.errors.session,
        formType: 'Sign Up',
        navLink: <Link to="/login">Already a member? Log in.</Link>,
        selfLink: '/signup',
        locations: locations
    }
};

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(createNewUser(user)),
    fetchLocations: () => dispatch(fetchLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
