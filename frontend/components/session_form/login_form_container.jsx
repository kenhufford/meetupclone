import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';
import {fetchLocations} from '../../actions/location_actions'

const mapStateToProps = (state) => ({
    errors: state.errors.session,
    formType: 'Log in',
    navLink: <Link to="/signup">Not registered with us yet? Sign up</Link>,
    selfLink: '/login'
});

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(login(user)),
    fetchLocations: () => dispatch(fetchLocations())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
