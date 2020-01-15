import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import currentUserReducer from "./current_user_reducer";
import eventsReducer from "./events_reducer";
import groupsReducer from "./groups_reducer";
import locationsReducer from "./locations_reducer";
import categoriesReducer from "./categories_reducer";
import membershipsReducer from "./memberships_reducer";
import reservationsReducer from "./reservations_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
  events: eventsReducer,
  groups: groupsReducer,
  locations: locationsReducer,
  categories: categoriesReducer,
  memberships: membershipsReducer,
  reservations: reservationsReducer
});

export default entitiesReducer;