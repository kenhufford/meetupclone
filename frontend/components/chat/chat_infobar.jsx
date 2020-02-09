
import React from "react";

class ChatInfoBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // const fetchGroupChannels = this.props.fetchGroupChannels(this.props.group.id)
    }

    render() {
        return (
            <div className="chat-info-bar">
                Chat Info Bar
                <p>1</p>
                <p>2</p>
                <p>3</p>
            </div>
        )
    }
}

export default ChatInfoBar;