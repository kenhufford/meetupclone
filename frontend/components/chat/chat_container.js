import { fetchUsersFromGroup, fetchUsersFromChannel } from '../../actions/user_actions';
import { fetchGroupChannels, createChannel, updateChannel} from '../../actions/channel_actions';
import { fetchChannelMessages, receiveMessage } from '../../actions/message_actions';
import { fetchChannelships, createChannelship, updateChannelship, fetchChannelshipsFromUser, deleteChannelship } from '../../actions/channelship_actions';
import { fetchGroupsFromUser } from '../../actions/group_actions';
import { connect } from 'react-redux';
import Chat from './chat';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchGroupsFromUser: (userId) => dispatch(fetchGroupsFromUser(userId)),
    fetchUsersFromGroup: (groupId) => dispatch(fetchUsersFromGroup(groupId)),
    fetchUsersFromChannel: (channelId) => dispatch(fetchUsersFromChannel(channelId)),
    fetchChannelMessages: channel => dispatch(fetchChannelMessages(channel)),
    fetchGroupChannels: groupId => dispatch(fetchGroupChannels(groupId)),
    fetchChannelships: channel => dispatch(fetchChannelships(channel)),
    fetchChannelshipsFromUser: channel => dispatch(fetchChannelshipsFromUser(channel)),
    createChannel: channel => dispatch(createChannel(channel)),
    updateChannel: channel => dispatch(updateChannel(channel)),
    updateChannelship: channel => dispatch(updateChannelship(channel)),
    createChannelship: channelship => dispatch(createChannelship(channelship)),
    deleteChannelship: channelship => dispatch(deleteChannelship(channelship)),
    receiveMessage: message=> dispatch(receiveMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
