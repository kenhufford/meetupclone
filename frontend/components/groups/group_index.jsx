import React from 'react';
import GroupIndexItem from './group_index_item'
import {Link} from 'react-router-dom'

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
        console.log(this.props)
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
             (<div onClick={this.handleSignup} className="index-div-titles">JOIN A SQUAD</div>) : 
            (<p className="index-div-titles">YOUR SQUADS</p>)
            return(
                <div className="index-div">
                    <div className="index-header">
                        {yourTitle}
                        <div className="index-switch-div">
                            <div className="index-switch-selected">
                                <Link className="index-switch-text-selected" to="/groups">SQUADS</Link>
                            </div>
                            <div className="index-switch-not">
                                <Link className="index-switch-text-not" to="/events">BRAWLS</Link>
                            </div>                    
                            <div className="index-switch-not">
                                <Link className="index-switch-text-not" to="/categories">STYLES</Link>
                            </div>                    
                        </div>
                    </div>
                    {yourGroups}
                    <p className="index-div-titles">ALL SQUADS</p>
                    {suggestedGroups}
                </div>
                
            )
        } else {
            return (<div></div>)
        }
    }
        
}

export default GroupIndex