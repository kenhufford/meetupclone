import React from 'react';
import ChannelIndexItem from './channel_index_item';
import LobbyChatMessage from './lobby_chat_message';
import ChannelCreationDropdown from './channel_creation_dropdown';
import LobbyRoomMemberDropdown from './lobby_room_member_dropdown';
import io from "socket.io-client";

class LobbyDisplay extends React.Component{
    constructor(){
        super (props)
        this.state = {
            messages = [],
            currentMessage: '',
            username: '',
            channelId: '',
            channelName: '',
            inChannelChatters: {},
            usersDropdownOpen: false,
        }
    }
}








