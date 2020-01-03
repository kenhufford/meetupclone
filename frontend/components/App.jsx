import React from "react";
import HeaderContainer from "./header/header_container";
import LoginFormContainer from "../components/session_form/login_form_container";
import SignupFormContainer from "../components/session_form/signup_form_container";
import {Route, Redirect, Switch, Link, HashRouter} from 'react-router-dom';

const App = () => (
  <div>
    <header>
      <HeaderContainer />
    </header>

    <Route path="/login" component={LoginFormContainer} />
    <Route path="/signup" component={SignupFormContainer} />
  </div>
);

export default App;