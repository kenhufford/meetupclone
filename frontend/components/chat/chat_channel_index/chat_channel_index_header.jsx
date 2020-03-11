import React from "react";

class ChatChannelIndexHeader extends React.Component{

    render(){
        let {modalType, modal, headerTitle, toggleModal} = this.props;
        return (
            <div className="chat-channel-dm-div">
                <p>{headerTitle}</p>
                {modal}
                <i className="fas fa-plus-circle"
                    onClick={(e) => toggleModal(modalType)}>
                </i>
            </div>
        )
    }
}

export default ChatChannelIndexHeader;