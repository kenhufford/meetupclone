import React from "react";
import HeaderContainer from "./header/header_container";
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import EventShowContainer from './events/event_show_container';
import GroupShowContainer from './groups/group_show/group_show_container';
import GroupLandingContainer from './groups/group_landing_container';
import SearchContainer from './searchbar/search_container';
import CreateGroupFormContainer from './groups/create_group_form_container';
import CreateEventFormContainer from './events/create_event_form_container';
import EditEventFormContainer from './events/edit_event_form_container';
import EditGroupFormContainer from './groups/edit_group_form_container';
import ChatContainer from './chat/chat_container';
import Index from './index';
import {Route, Redirect, Switch} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';


const App = () => (
  <div>
    <header>
      <HeaderContainer />
    </header>
    <div className="main-body">
      <Switch>
        <AuthRoute exact path="/login" component={LogInFormContainer} />
        <AuthRoute exact path="/signup" component={SignUpFormContainer} />
        <Route path="/search" component={SearchContainer} />
        <ProtectedRoute path="/chat" component={ChatContainer} />
        <ProtectedRoute exact path="/events/form/:eventId/edit/" component={EditEventFormContainer} />
        <ProtectedRoute path="/events/new/:groupId" component={CreateEventFormContainer} />
        <ProtectedRoute exact path="/groups/form/new" component={CreateGroupFormContainer} />
        <Route exact path="/groups/:groupId/events/:eventId" component={EventShowContainer} />
        <ProtectedRoute exact path="/groups/form/:groupId/edit" component={EditGroupFormContainer} />
        <Route path="/index" component={Index} />
        <Route path="/groups/:groupId" component={GroupShowContainer} />
        <Route exact path="/" component={GroupLandingContainer} />
        <Redirect exact to="/" />
      </Switch>
    </div>
  </div>
);

export default App;