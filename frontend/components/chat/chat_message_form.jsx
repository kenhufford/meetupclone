import React from "react";

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            body: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }

    update(e) {
        this.setState({ body: e.currentTarget.value });
    }

    handleSubmit(e) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            App.cable.subscriptions.subscriptions[0].speak({ 
                message: this.state.body, 
                user_id: this.props.userId, 
                channel_id: this.props.selectedChannelId });
            this.setState({ body: "" });
        }
    }

    render() {
        return (
            <div className="chat-message-form">
                <form>
                    <textarea
                        value={this.state.body}
                        onChange={this.update}
                        placeholder="Type message here"
                        onKeyDown={this.handleSubmit.bind(this)}
                    />
                </form>
            </div>
        );
    }
}

export default MessageForm;