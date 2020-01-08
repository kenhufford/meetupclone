import React from 'react';
import {Link} from 'react-router-dom'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      location: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleDemoLogin(){
    this.setState({
      name: '',
      email: 'demo@gmail.com',
      password: '123456',
      location: ''
    }, () => this.props.processForm(this.state).then(() => this.props.history.push('/')))
  }

  handleSubmit(e) {
    this.props.processForm(this.state)
      .then(() => this.props.history.push('/groups'))
       //change this to splash
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`} className="login-form-errors">
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const display = this.props.formType==="Log in" ? (
        <div className="login-form-container">
          <form onSubmit={this.handleSubmit} className="login-form-box">
            <h3 className="login">Log in
              <p className="login-not-reg">Not Registered with us yet?    
                <Link to="/signup" className="login-signup-link">   Sign Up</Link>
              </p>
              {this.renderErrors()}
            </h3>
            <div className="login-form">
              <label className="login-form-label">Email Address:
                <br/>
                <input type="text"
                  value={this.state.email}
                  onChange={this.update('email')}
                  className="login-input"
                />
              </label>
               <br/>
              <label className="login-form-label">Password:
               <br/>
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className="login-input"
                />
              </label>
              <br/>
              <div className="login-buttons-div">
                <input className="login-submit" type="submit" value={this.props.formType} />
                <p>OR </p>
                <input onClick={this.handleDemoLogin}  className="login-demo-submit" type="submit" value="Demo Sign In"/>
              </div>
            </div>
          </form>
            
        </div>
      ) : (
        <div className="signup-form-container">
          <h3>Sign Up</h3>
          <form onSubmit={this.handleSubmit} className="signup-box">
            {this.renderErrors()}
            <div className="signup">
              <label className="login-form-label">Your name
                <input type="text"
                  value={this.state.name}
                  onChange={this.update('name')}
                  className="login-input"
                />
              </label>
              <br/>
              <label className="login-form-label">Email address
                <input type="text"
                  value={this.state.email}
                  onChange={this.update('email')}
                  className="login-input"
                />
              </label>
              <br/>
              <label className="login-form-label">Password
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className="login-input"
                />
              </label>
              <br/>
              <label className="login-form-label">Location
                <input type="text"
                  value={this.state.location}
                  onChange={this.update('location')}
                  className="login-input"
                />
              </label>
              <p className="signup-terms">Your name is public. We'll use your email address to send you updates, and your location to find Meetups near you. When you "Continue", you agree to Meetup's Terms of Service. We will manage information about you as described in our Privacy Policy, and Cookie Policy.</p>
              <input className="signup-submit" type="submit" value="Continue" />
            </div>
          </form>
          <div className="signup-already-member">
            <p>Already a member?  
              <Link to="/login" className="login-signup-link">   Log in.</Link>
            </p>
          </div>
        </div>
    );   

    return (
      display
    );
  }
}

export default SessionForm;
