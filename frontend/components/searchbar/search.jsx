import React from 'react'
import GroupIndexItem from '../groups/group_index_item'
import SearchBar from '../searchbar/search_bar'

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            groups: [],
            query: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
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

    componentDidMount(){
        let queryString = this.props.location.search;
        let result = queryString.slice(1).split("%20").join(" ")
        this.props.searchGroups(result)
            .then(payload => {
                let groups = Object.values(payload.groups)
                this.setState({groups})
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            let queryString = this.props.location.search;
            let result = queryString.slice(1).split("%20").join(" ")
            this.props.searchGroups(result)
                .then(payload => {
                    let groups = Object.values(payload.groups)
                    this.setState({groups})
                })
        }
    }

    render(){
        let {groups} = this.state
        let searchedGroups = (
            <div className="groups-div">
                {groups.map( (group) => (
                    <GroupIndexItem key={group.id} group={group}/>
                ))}
            </div>
        )
        return(
            <div className="groups-search-div">
                <div className="groups-search-bar-div">
                    <SearchBar history={this.props.history} />
                </div>
                <ul className="groups-index-div-results">
                    <p>GROUP RESULTS</p>
                    {searchedGroups}
                </ul>

            </div>
        )
    }
}

export default Search