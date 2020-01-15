import React from 'react';
import {Link} from 'react-router-dom'
import CreateGroupFormDropdown from '../groups/create_group_form_dropdown'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      selectedLocation: "Select Location",
      selectedLocationId: "",
      locationError: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  componentDidMount(){
    this.props.fetchLocations()
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  toggleSelected(index){

    let loc = this.props.locations[index]
    this.setState({
      selectedLocation: loc.name,
      selectedLocationId: loc.id
    })
  }

  handleDemoLogin(){
    this.setState({
      name: '',
      email: 'demo@gmail.com',
      password: '123456',
      selectedLocationId: 1
    }, () => this.props.processForm(this.state))
  }

  handleSubmit(e) {
    e.preventDefault(); 
    debugger
    if (this.state.selectedLocationId === ""){
      this.setState({
        locationError: "Please select a location"
      })
    } else {
      this.props.processForm({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        location_id: this.state.selectedLocationId,
        image_url: "gokuURL"
      })
    }
  }

  renderErrors() {
    if (!this.props.errors) return (<ul></ul>)
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
    debugger
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
              <div>
                <p className="signup-selected-location-error">{this.state.locationError}</p>
                
              </div>
              <div className="signup-location-dropdown-div">
                <p className="signup-selected-location">{this.state.selectedLocation}</p>                  
                <CreateGroupFormDropdown  location={this.state.selectedLocation} list={this.props.locations} toggleLocation={this.toggleSelected} />
              </div>
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
