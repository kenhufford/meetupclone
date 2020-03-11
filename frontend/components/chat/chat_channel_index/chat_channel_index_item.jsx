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
        let {channel, selected, dm, selectChannel, notify} = this.props;
        let removeChannelshipEle = (this.state.hovering && !dm) ? 
            <i className="fas fa-ban remove-button"
                onClick={() => this.props.removeChannelship(channel.channelshipId[0])}></i> : 
            <i className="hidden"></i>
        
        return (
            <div className={selected ? "chat-channel-dm-container-selected" : "chat-channel-dm-container"}
                onMouseEnter={() => this.hover(true)}
                onMouseLeave={() => this.hover(false)}>
                <div className="chat-channel-index-item-left">
                    
                    <i className={selected ? "fas fa-circle circle-selected" : "far fa-circle"}></i>
                    <li onClick={(e) => {
                            selectChannel(channel);
                            this.clearNotify(e)
                        }}
                        className={notify ? ("chat-channel-index-item-notify") : ("chat-channel-index-item")}>
                        {channel.name}
                    </li>
                </div>
                {removeChannelshipEle}
            </div>)
    }

}

export default ChatChannelIndexItem