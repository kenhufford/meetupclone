import React from 'react';
import {Link} from 'react-router-dom'
import CreateGroupFormDropdown from '../groups/create_group/create_group_form_dropdown'

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
    this.props.fetchLocations();
  }

  componentWillUnmount(){
    this.props.clearErrors();
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
    if (this.state.selectedLocationId === "" && this.props.formType === "Sign up"){
      this.setState({
        locationError: "Please select a location"
      })
    } else if (this.props.formType === "Log in"){
      this.props.processForm(this.state);
    }else {
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
              <input onClick={this.handleSubmit}  className="login-submit" type="submit" value={this.props.formType} />
                <p>OR </p>
                <input onClick={this.handleDemoLogin}  className="login-demo-submit" type="submit" value="Demo Sign In"/>
              </div>
            </div>
          </form>
            
        </div>
      ) : (
        <div className="signup-form-container">
          <div>Sign Up</div>
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
              <p className="signup-terms">Your name is public. You don't really have to use a real one so pick something adventurous and heroic.  We will only share the information provided to other Squads and Brawlers on Beatup so don't worry about it too much but maybe don't put your location because sometimes our Brawlers get a little overzealous!</p>
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
