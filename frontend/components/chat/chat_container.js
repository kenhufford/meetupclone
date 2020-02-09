import { fetchAllUsers } from '../../actions/user_actions';
import { fetchGroupChannels, createChannel } from '../../actions/channel_actions';
import { fetchChannelMessages } from '../../actions/message_actions';
import { fetchChannelships, createChannelship } from '../../actions/channelship_actions';
import { connect } from 'react-redux';
import Chat from './chat';

const mapStateToProps = (state) => {
    let currentUser = state.session.id === undefined ? false : true
    return {
        currentUser: currentUser,
        messages: state.entities.messages,
        users: state.entities.users,
        channels: state.entities.channels,
        channelships: state.entities.channelshi
    };
};

const mapDispatchToProps = dispatch => ({
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchChannelMessages: channel => dispatch(fetchChannelMessages(channel)),
    fetchGroupChannels: groupId => dispatch(fetchGroupChannels(groupId)),
    fetchChannelships: channel => dispatch(fetchChannelships(channel)),
    createChannel: channel => dispatch(createChannel(channel)),
    createChannelship: channelship => dispatch(createChannelship(channelship))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
