import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            query: "",
            typing: false,
            typingTimeout: 0,
            autoSearch: this.props.autoSearch
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
    }

    update(e) {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
         }

        if (this.state.autoSearch){
            this.setState({
                query: e.target.value,
                typing: false,
                typingTimeout: setTimeout((() => {
                    if (this.state.query === "") {
                        this.props.history.push("/groups");
                    } else {
                        this.props.history.push(`/search/?${this.state.query}`);
                    }
                }), 300)
            });
        }

        this.setState({
            query: e.currentTarget.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        setTimeout((() => {
            if (this.state.query === "") {
                this.props.history.push("/groups");
              } else {
                this.props.history.push(`/search/?${this.state.query}`);
              }}), 300);
    }

    render(){
        return(
            <div className="search-bar-div">
                <form className="search-bar-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.query} onChange={this.update} 
                    placeholder="Find your fight club" className="search-bar-input"/>
                </form>
                <button className="search-bar-button" onClick={this.handleSubmit}>Search</button>
            </div>
        )
    }


}


export default withRouter(SearchBar);

