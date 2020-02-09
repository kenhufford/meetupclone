import React from "react";

class ChannelIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
    }

    render(){
        return (
            <div className="chat-channel-index">
                Channel index
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
        )
    }
}

export default ChannelIndex;