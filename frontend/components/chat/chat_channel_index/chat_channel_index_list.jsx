import React from "react";
import { moreRecentOrEqualThanDate } from '../../../utils/date_util';
import ChatChannelIndexItem from './chat_channel_index_item';

class ChatChannelIndexList extends React.Component{
    render(){
        let { channels, removeChannelship, selectChannel, dm, selectedId, channelToChannelshipHash} = this.props;
        let channelsList;
        if (channels.length !== 0) {
            channelsList = channels.map((channel) => {
                let selected = channel.id === selectedId;
                let notify;
                if (channel.id in channelToChannelshipHash){
                    notify = !moreRecentOrEqualThanDate(channelToChannelshipHash[channel.id].lastVisited, channel.updatedAt)
                } else {
                    false;
                }
                return (
                <ChatChannelIndexItem
                    key={channel.id}
                    selected={selected}
                    notify={notify}
                    dm={dm}
                    removeChannelship={removeChannelship}
                    selectChannel={selectChannel}
                    channel={channel} />)
            })
        } else {
            channelsList = <p></p>
        }

        return (
            <ul className="chat-channel-list">
                {channelsList}
            </ul>
        )
    }
}

export default ChatChannelIndexList;