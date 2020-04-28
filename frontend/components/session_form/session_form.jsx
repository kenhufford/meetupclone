import React, {useState} from 'react';
import Login from './login';
import Signup from './signup';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      selectedLocation: "Select Location",
      selectedLocationId: "",
      locationError: "",
      power: 0,
      speed: 0,
      technique: 0,
      guts: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.update = this.update.bind(this);
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
    let loc = this.props.locations[index-1]
    this.setState({
      selectedLocation: loc.name,
      selectedLocationId: loc.id
    })
  }

  handleDemoLogin(){
    this.setState({
      name: '',
      email: 'saitama@gmail.com',
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
        image_url: "gokuURL",
        power: Math.floor(Math.random()*100),
        guts: Math.floor(Math.random() * 100),
        technique: Math.floor(Math.random() * 100),
        speed: Math.floor(Math.random() * 100)
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
        <Login
        handleSubmit={this.handleSubmit} 
        renderErrors={this.renderErrors} 
        update={this.update}
        handleDemoLogin={this.handleDemoLogin}
        email={this.state.email} 
        password={this.state.password} 
        formType={this.props.formType}
          />
      ) : (
        <Signup
          handleSubmit={this.handleSubmit}
          renderErrors={this.renderErrors}
          update={this.update}
          toggleSelected={this.toggleSelected}
          locationError={this.state.locationError}
          email={this.state.email}
          password={this.state.password}
          name={this.state.name}
          locations={this.props.locations}
          selectedLocation={this.state.selectedLocation}
          />
    );   
    return (
      display
    );
  }
}

export default SessionForm;
