import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import {fetchGroupChannels, updateChannel, deleteChannel} from './actions/channel_actions'
// import {fetchChannelMessages, createMessage, deleteMessage} from './actions/message_actions'
import {fetchChannelships, updateChannelship, deleteChannelship} from './actions/channelship_actions'

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
  // window.fetchGroupChannels = fetchGroupChannels;
  window.updateChannel = updateChannel;
  // window.deleteChannel = deleteChannel;
  // window.fetchChannelMessages = fetchChannelMessages;
  // window.createMessage = createMessage;
  // window.deleteMessage = deleteMessage;
  // window.fetchChannelships = fetchChannelships;
  window.updateChannelship = updateChannelship;
  // window.deleteChannelship = deleteChannelship;
  

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
