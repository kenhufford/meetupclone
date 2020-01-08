import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import eventsReducer from "./events_reducer";
import groupsReducer from "./groups_reducer";
import locationsReducer from "./locations_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer,
  groups: groupsReducer,
  locations: locationsReducer
});

export default entitiesReducer;