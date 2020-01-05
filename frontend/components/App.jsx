import React from "react";
import HeaderContainer from "./header/header_container";
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import EventIndexContainer from './events/event_index_container';
import GroupIndexContainer from './groups/group_index_container';
import {Route, Redirect, Switch, Link, HashRouter} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

const App = () => (
  <div>
    <header>
      <HeaderContainer />
    </header>
    <div className="main-body">
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <Route path="/events" component={EventIndexContainer} />
      <Route path="/groups" component={GroupIndexContainer} />
    </div>
  </div>
);

export default App;