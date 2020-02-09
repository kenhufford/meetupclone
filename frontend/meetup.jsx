import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import {fetchGroupChannels, createChannel, deleteChannel} from './actions/channel_actions'

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
  window.fetchGroupChannels = fetchGroupChannels;
  window.createChannel = createChannel;
  window.deleteChannel = deleteChannel;
  

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
