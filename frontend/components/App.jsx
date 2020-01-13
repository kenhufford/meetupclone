import React from "react";
import HeaderContainer from "./header/header_container";
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import EventIndexContainer from './events/event_index_container';
import EventShowContainer from './events/event_show_container';
import GroupIndexContainer from './groups/group_index_container';
import GroupShowContainer from './groups/group_show_container';
import GroupLandingContainer from './groups/group_landing_container';
import SearchContainer from './searchbar/search_container';
import CreateGroupFormContainer from './groups/create_group_form_container';
import EditGroupFormContainer from './groups/edit_group_form_container';
import {Route, Redirect, Switch, Link, HashRouter} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

const App = () => (
  <div>
    <header>
      <HeaderContainer />
    </header>
    <div className="main-body">
      <Switch>
        <ProtectedRoute exact path="/groups/form/new" component={CreateGroupFormContainer} />
        <ProtectedRoute exact path="/groups/form/:groupId/edit" component={EditGroupFormContainer} />
        <AuthRoute exact path="/login" component={LogInFormContainer} />
        <AuthRoute exact path="/signup" component={SignUpFormContainer} />
        <Route exact path="/groups/:groupId/events/:eventId" component={EventShowContainer} />
        <Route exact path="/events" component={EventIndexContainer} />
        <Route path="/search" component={SearchContainer} />
        <Route exact path="/groups/:groupId" component={GroupShowContainer} />
        <Route exact path="/groups" component={GroupIndexContainer} />
        <Route exact path="/" component={GroupLandingContainer} />
        <Redirect exact to="/" />
      </Switch>
    </div>
  </div>
);

export default App;