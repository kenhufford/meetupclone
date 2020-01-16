import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import {fetchEventsFromGroup, searchEvents} from './actions/event_actions'
import {fetchMemberships, deleteMembership, updateMembership, createMembership} from './actions/membership_actions'
import {fetchReservations, deleteReservation, updateReservation, createReservation} from './actions/reservation_actions'
import {fetchAllUsers, fetchUsersFromGroup} from './actions/user_actions'

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: window.currentUser
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
  window.fetchEventsFromGroup = fetchEventsFromGroup;
  window.searchEvents = searchEvents;
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
