import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import {fetchAllEvents, fetchEvent, createEvent, updateEvent, deleteEvent} from './actions/event_actions'
import {fetchMemberships, deleteMembership, updateMembership, createMembership} from './actions/membership_actions'
import {fetchReservations, deleteReservation, updateReservation, createReservation} from './actions/reservation_actions'
import {fetchAllUsers, fetchUsersFromGroup, fetchUsersFromEvent} from './actions/user_actions'

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
  window.fetchAllUsers = fetchAllUsers;
  window.fetchUsersFromEvent = fetchUsersFromEvent;
  window.fetchUsersFromGroup = fetchUsersFromGroup;
  window.fetchMemberships = fetchMemberships;
  window.createMembership = createMembership;
  window.deleteMembership = deleteMembership;
  window.updateMembership = updateMembership;
  window.fetchReservations = fetchReservations;
  window.createReservation = createReservation;
  window.deleteReservation = deleteReservation;
  window.updateReservation = updateReservation;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
