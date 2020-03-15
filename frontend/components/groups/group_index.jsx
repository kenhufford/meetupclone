import React from 'react';
import GroupIndexItem from './group_index_item';

class GroupIndex extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loaded: false,
            userGroups: {}
        }
    this.handleSignup = this.handleSignup.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
}

    handleSignup(){
        if (this.props.currentUserId === ""){
            document.location.href = '#/signup'
        } else {
            return null
        }
    }

    componentDidMount(){
        if (this.props.currentUserId !== undefined){
            const fetchGroups = this.props.fetchGroups();
            const fetchGroupsFromUser = this.props.fetchGroupsFromUser(this.props.currentUserId);
            const fetchCategories = this.props.fetchCategories();

            Promise.all([fetchCategories, fetchGroups, fetchGroupsFromUser])
                .then((data) => {
                    let userGroups = data[2].groups;
                    this.setState({ loaded: true, userGroups });
                })
        } else {
            const fetchGroups = this.props.fetchGroups();
            const fetchCategories = this.props.fetchCategories();

            Promise.all([fetchCategories, fetchGroups])
                .then(() => {
                    this.setState({ loaded: true });
            })
        }
    }


    render(){
        if(this.state.loaded){
            let {groups} = this.props
            let userGroups = Object.values(this.state.userGroups)
            let suggestedGroups = (
                <div className="groups-div">
                    {Object.values(groups).map( (group) => (
                        <GroupIndexItem key={group.id} group={group}/>
                    ))}
                </div>
            )
            let yourGroups = userGroups.length ? (
                <div className="groups-div">
                    {userGroups.map( (group, i) => (
                        <GroupIndexItem key={i} group={group}/>
                    ))}
                </div>
            ) :  (<div></div>)
            let yourTitle = !userGroups.length ?
             (<div onClick={this.handleSignup} className="index-div-titles">Join a squad</div>) : 
            (<p className="index-div-titles">Your Squads</p>)
            return(
                <div className="component-index">
                    {yourTitle}
                    {yourGroups}
                    <p className="index-div-titles">All Squads</p>
                    {suggestedGroups}
                </div>
                
            )
        } else {
            return (<div></div>)
        }
    }
        
}

export default GroupIndex