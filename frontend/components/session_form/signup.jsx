import React from 'react';
import SignupFormLeft from './signup_form_left';

const Signup = props => {
    const { handleSubmit, renderErrors, update, toggleSelected, name, email, 
        password, locationError, locations, selectedLocation} = props;
    return (
        <div className="login-form-container">
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
                />
        </div>
    )
}

export default Signup;