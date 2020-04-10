import React from "react";
import { Link } from 'react-router-dom';

const Login = props => {
    const {handleSubmit, renderErrors, update, email, password, formType, handleDemoLogin} = props;
    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form-box">
                <h3 className="login">Log in
                    <p className="login-not-reg">Not Registered with us yet?
                        <Link to="/signup" className="login-signup-link">   Sign Up</Link>
                    </p>
                    {renderErrors()}
                </h3>
                <div className="login-form">
                    <div className="login-form-label">
                        Email Address:
                        <input type="text"
                            value={email}
                            onChange={update('email')}
                            className="login-input"
                        />
                    </div>
                    <div className="login-form-label">
                        Password:
                        <input type="password"
                            value={password}
                            onChange={update('password')}
                            className="login-input"
                        />
                    </div>
                    <br />
                    <div className="login-buttons-div">
                        <input onClick={handleSubmit} 
                            className="login-submit" 
                            type="submit" 
                            value={formType} />
                        <input onClick={handleDemoLogin} 
                            className="login-submit" 
                            type="submit" 
                            value="Demo" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;