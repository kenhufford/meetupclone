import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import {fetchAllGroups, fetchGroup, createGroup, updateGroup, deleteGroup} from './actions/group_actions'
import {fetchAllEvents, fetchEvent, createEvent, updateEvent, deleteEvent} from './actions/event_actions'

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id },
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      }
    };
    store = configureStore(preloadedState);

    delete window.currentUser;
  } else {
    store = configureStore();
  }

  window.store = store;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.fetchAllGroups = fetchAllGroups;
  window.fetchAllEvents = fetchAllEvents;
  window.fetchGroup = fetchGroup;
  window.fetchEvent = fetchEvent;
  window.createGroup = createGroup;
  window.deleteGroup = deleteGroup;
  window.updateGroup = updateGroup;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
