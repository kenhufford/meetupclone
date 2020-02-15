import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import currentUserReducer from "./current_user_reducer";
import eventsReducer from "./events_reducer";
import groupsReducer from "./groups_reducer";
import locationsReducer from "./locations_reducer";
import categoriesReducer from "./categories_reducer";
import membershipsReducer from "./memberships_reducer";
import reservationsReducer from "./reservations_reducer";
import channelsReducer from "./channels_reducer";
import messagesReducer from "./messages_reducer";
import channelshipsReducer from "./channelships_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  events: eventsReducer,
  groups: groupsReducer,
  locations: locationsReducer,
  categories: categoriesReducer,
  memberships: membershipsReducer,
  reservations: reservationsReducer,
  channels: channelsReducer,
  channelships: channelshipsReducer,
  messages: messagesReducer,
});

export default entitiesReducer;