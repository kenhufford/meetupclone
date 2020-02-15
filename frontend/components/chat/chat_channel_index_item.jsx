import React from "react";

class ChatChannelIndexItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hovering: false
        }
        this.clearNotify = this.clearNotify.bind(this);
    }

    clearNotify(e) {
        e.currentTarget.className = "chat-channel-index-item";
    }

    hover(boolean){
        this.setState({
            hovering:boolean
        })
    }

    render(){
        let channel = this.props.channel;
        let removeChannelshipEle = (this.state.hovering && !this.props.dm) ? 
            <i className="fas fa-ban remove-button"
                onClick={() => this.props.removeChannelship(this.props.selectedChannelship)}></i> : 
            <i className="hidden"></i>

        return (
            <div className="chat-channel-dm-container"
                onMouseEnter={() => this.hover(true)}
                onMouseLeave={() => this.hover(false)}>
                <div className="chat-channel-index-item-left">
                    <i className="far fa-circle"></i>
                    <li onClick={(e) => {
                            this.props.selectChannel(channel);
                            this.clearNotify(e)
                        }}
                        className={this.props.notify ? ("chat-channel-index-item-notify") : ("chat-channel-index-item")}>
                        {channel.name}
                    </li>
                </div>
                {removeChannelshipEle}
            </div>)
    }

}

export default ChatChannelIndexItem