import { fetchChannelMessages, receiveMessage } from '../../actions/message_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChatDisplay from './chat_display';

const mapStateToProps = (state) => ({
    currentUser: state.session,
    messages: state.entities.messages,
    users: state.entities.users,
    channels: state.entities.channels
})

const mapDispatchToProps = dispatch => ({
    fetchUsersFromChannel: (channelId) => dispatch(fetchUsersFromChannel(channelId)),
    fetchChannelMessages: channel => dispatch(fetchChannelMessages(channel)),
    receiveMessage: message => dispatch(receiveMessage(message))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatDisplay));
