import React from 'react';

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
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state)
      .then(this.props.history.push('/')) //change this to splash

  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
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
          Log in
          <br/>
          {this.props.navLink}
          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label>Email Address:
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    ) : (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          Log in
          <br/>
          {this.props.navLink}
          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label>Name:
              <input type="text"
                value={this.state.name}
                onChange={this.update('name')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Email Address:
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <label>Location:
              <input type="text"
                value={this.state.location}
                onChange={this.update('location')}
                className="login-input"
              />
            </label>
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    );   

    return (
      display
    );
  }
}

export default SessionForm;
