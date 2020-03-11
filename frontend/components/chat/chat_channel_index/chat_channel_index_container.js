import { connect } from 'react-redux';
import ChatChannelIndex from './chat_channel_index';
import { fetchChannelshipsFromUser, createChannelship} from '../../../actions/channelship_actions';
import { fetchGroupChannels, createChannel} from '../../../actions/channel_actions';

const mapStateToProps = (state) => ({
    groupChannels: state.entities.channels.groupChannels,
    userChannels: state.entities.channels.userChannels,
    channelships: state.entities.channelships,
    currentUser: state.session,
})

const mapDispatchToProps = dispatch => ({
    fetchChannelshipsFromUser: () => dispatch(fetchChannelshipsFromUser()),
    createChannel: channel => dispatch(createChannel(channel)),
    fetchGroupChannels: groupId => dispatch(fetchGroupChannels(groupId)),
    createChannelship: channelship => dispatch(createChannelship(channelship)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatChannelIndex);
