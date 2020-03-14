import React from 'react';
import ChatMessage from "./chat_message";
import { formatTime, formatDateWithDay } from "../../utils/date_util";

class ChatMessageIndex extends React.Component{
    render(){
        let lastDay;
        let { channelUsers, messages, bottom} = this.props;
        const messageList = messages.map((message) => {
            if (channelUsers[message.userId] === undefined) return null
            let thisDay = formatDateWithDay(message.createdAt);
            let diffDay = thisDay !== lastDay;
            lastDay = thisDay;
            let dateDivider = diffDay ? <div className="chat-message-datedivider">
                <span>{thisDay}</span>
            </div> :
                <div> </div>
            return (
                <ChatMessage
                    key={message.id}
                    dateDivider={dateDivider}
                    image={channelUsers[message.userId].imageUrl}
                    name={channelUsers[message.userId].name}
                    time={formatTime(message.createdAt)}
                    message={message.message}
                    bottom={bottom}
                />
            );
        });
        return (
            <ul className="message-list">
                {messageList}
            </ul>
        )
    }
}

export default ChatMessageIndex;