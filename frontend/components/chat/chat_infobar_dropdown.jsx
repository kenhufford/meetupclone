import React from 'react';
import onClickOutside from "react-onclickoutside";

class ChatInfoBarDropdown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listOpen: false
        }
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside() {
        this.setState({
            listOpen: false
        })
    }

    render(){
        const { listOpen } = this.state
        return (
            <div>

            </div>
            
                )
        }
}

export default onClickOutside(ChatInfoBarDropdown)