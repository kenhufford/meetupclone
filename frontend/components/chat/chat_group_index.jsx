
import React from "react";

class ChatGroupIndex extends React.Component {
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
            <div className="chat-group-index">
                Group index
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
        )
    }
}

export default ChatGroupIndex;