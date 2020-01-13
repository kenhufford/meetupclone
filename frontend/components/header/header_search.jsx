import React from 'react';

class HeaderSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            query: "",
            history: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
        this.deleteQuery = this.deleteQuery.bind(this)
    }

    deleteQuery(e){
        this.setState({
            query: ""
        })
    }

    update(e) {
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
        if (!this.props.history) return null
        return(
            <div className="header-search-bar-div">
                <form className="header-search-bar-form" onSubmit={this.handleSubmit}>
                    <input placeholder="Find your fight club" type="text" value={this.state.query} onChange={this.update} 
                    className="header-search-bar-input"/>
                    <i onClick={this.deleteQuery} className="fas fa-backspace"></i>
                </form>
            </div>
        )
    }


}


export default HeaderSearch

