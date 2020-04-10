import React from 'react';
import { Link } from 'react-router-dom';
import CreateGroupFormDropdown from '../groups/create_group/create_group_form_dropdown';

const Signup = props => {
    const { handleSubmit, renderErrors, update, toggleSelected, name, email, 
        password, locationError, locations, selectedLocation} = props;
    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="signup-box">
                <h3 className="login">Sign up
                    {renderErrors()}
                </h3>
                <div className="signup">
                    <div className="login-form-label">Your name
                        <input type="text"
                                    value={name}
                                    onChange={update('name')}
                                    className="login-input"
                                />
                    </div>
                    <div className="login-form-label">Email address
                        <input type="text"
                                    value={email}
                                    onChange={update('email')}
                                    className="login-input"
                                />
                    </div>
                    <div className="login-form-label">Password
                        <input type="password"
                                    value={password}
                                    onChange={update('password')}
                                    className="login-input"
                                />
                    </div>
                    <p className="signup-selected-location-error">{locationError}</p>
                    <div className="signup-location-dropdown-div">
                        <p className="signup-selected-location">
                            {selectedLocation}
                        </p>
                        <CreateGroupFormDropdown 
                            location={selectedLocation} 
                            list={locations} 
                            toggleLocation={toggleSelected} />
                    </div>
                    <p className="signup-terms">
                        Your name is public. You don't really have to use a real one so pick something adventurous and heroic.  We will only share the information provided to other Squads and Brawlers on Beatup so don't worry about it too much but maybe don't put your location because sometimes our Brawlers get a little overzealous!
                    </p>
                    <input className="signup-submit" 
                        type="submit" 
                        value="Continue"/>
                </div>
            </form>
            <div className="signup-already-member">
                <p className="signup-terms">Already a member?
                    <Link to="/login" 
                        className="login-signup-link">   
                        Log in.
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup;