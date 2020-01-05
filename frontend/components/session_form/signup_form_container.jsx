import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';
import {createNewUser} from '../../actions/session_actions'

const mapStateToProps = (state) => ({
    errors: state.errors.session,
    formType: 'Sign Up',
    navLink: <Link to="/login">Already a member? Log in.</Link>,
    selfLink: '/signup'
});

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(createNewUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
