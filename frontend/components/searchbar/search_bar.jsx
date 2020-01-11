import React from 'react';

class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search_term: ""
        }
        // this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
    }

    componentDidMount(){
        this.props.fetchLocations()
    }

    update(e){
        console.log(e)
        this.setState({
            search_term: e.currentTarget.value
        })
    }

    // handleSubmit(e) {
    //     console.log(e)
    //     e.preventDefault();
    //     this.props.fetchGroups(this.state)
    //         .then( payload => console.log(payload))
    //   }

    render(){
        if (!this.props.locations) return null
        return(
            <div className="search-bar-div" onSubmit={this.handleSubmit}>
                <form>
                    <input className="search-bar-input" type="text" value={this.state.search_term} onChange={this.update}/>
                </form>
            </div>
        )
    }


}


export default SearchBar

