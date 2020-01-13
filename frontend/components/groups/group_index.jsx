import React from 'react';
import GroupIndexItem from './group_index_item'
import {Link} from 'react-router-dom'

class GroupIndex extends React.Component{
    constructor(props){
        super(props)
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
        this.props.fetchGroups();
        this.props.fetchCategories();
        if (this.props.currentUserId){
            this.props.fetchUser(this.props.currentUserId);
        }
        
    }


    render(){
        let {currentUsersGroupIds, groups, categories} = this.props
        let userGroups;
        let yourGroups;
        if (!groups[1]) return null
        let suggestedGroups = (
            <div className="groups-div">
                {Object.values(groups).map( (group) => (
                    <GroupIndexItem key={group.id} group={group}/>
                ))}
            </div>
        )
        if (currentUsersGroupIds){
            userGroups = []
            currentUsersGroupIds.map(groupId => {
                userGroups.push(groups[groupId])
            })
            yourGroups = userGroups.length ? (
                <div className="groups-div">
                    {userGroups.map( (group, i) => (
                        <GroupIndexItem key={i} group={group}/>
                    ))}
                </div>
            ) :  
            (<div onClick={this.handleSignup} className="index-signup">Join a squad!</div>)
        }

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
                    </div>
                </div>
                {yourGroups}
                <p className="index-div-titles">ALL SQUADS</p>
                {suggestedGroups}
            </div>

        )

    }
}

export default GroupIndex