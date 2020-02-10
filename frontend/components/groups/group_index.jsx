import React from 'react';
import GroupIndexItem from './group_index_item'
import {Link} from 'react-router-dom'

class GroupIndex extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loaded: false
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
        const fetchGroups = this.props.fetchGroups();
        // const fetchMemberships = this.props.fetchMemberships(0);
        const fetchCategories = this.props.fetchCategories();

        Promise.all([fetchCategories, fetchGroups])
            .then( () => this.setState({loaded:true}))
        
    }


    render(){
        console.log(this.props)
        if(this.state.loaded){
            let {currentUsersGroups, groups} = this.props
            let suggestedGroups = (
                <div className="groups-div">
                    {Object.values(groups).map( (group) => (
                        <GroupIndexItem key={group.id} group={group}/>
                    ))}
                </div>
            )
            let yourGroups = currentUsersGroups.length ? (
                <div className="groups-div">
                    {currentUsersGroups.map( (group, i) => (
                        <GroupIndexItem key={i} group={group}/>
                    ))}
                </div>
            ) :  
            (<div onClick={this.handleSignup} className="index-signup">Join a squad!</div>)

            return(
                <div className="index-div">
                    <div className="index-header">
                        <p className="index-div-titles">YOUR SQUADS</p>
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