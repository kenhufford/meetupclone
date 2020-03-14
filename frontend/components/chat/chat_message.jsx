import React from 'react';

class ChatMessage extends React.Component{
    render(){
        let {dateDivider, image, name, time, message, bottom} = this.props;
        return (
            <li>
                {dateDivider}
                <div className="chat-message">
                    <img
                        className="chat-message-img"
                        src={window[image]} />
                    <div className="chat-message-right">
                        <div className="chat-message-info">
                            <p className="chat-message-name">{name}</p>
                            <p className="chat-message-time">{time}</p>
                        </div>
                        <div className="chat-message-message">
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
                <div ref={bottom} />
            </li>
        )
    }
}

export default ChatMessage