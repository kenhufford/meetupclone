import React from 'react';
import SignupFormLeft from './signup_form_left';
import SignupFormRight from './signup_form_right';

const Signup = props => {
    const { handleSubmit, renderErrors, update, toggleSelected, name, email, 
        password, locationError, locations, selectedLocation, power, guts,
        technique, speed} = props;
    return (
        <div className="signup-form-container">
            <SignupFormLeft
                handleSubmit={handleSubmit}
                renderErrors={renderErrors}
                update={update}
                toggleSelected={toggleSelected}
                name={name}
                email={email}
                password={password}
                locationError={locationError}
                locations={locations}
                selectedLocation={selectedLocation}
                />
            <SignupFormRight
                power={power}
                guts={guts}
                technique={technique}
                speed={speed}
                update={update}
                />
        </div>
    )
}

export default Signup;