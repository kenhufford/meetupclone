import React from 'react';
import GroupIndexList from './group_index_list';
import {Link} from 'react-router-dom';

class GroupIndex extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loaded: false,
            userGroups: {}
        }
    }

    componentDidMount(){
        if (this.props.currentUserId !== undefined){
            const fetchGroups = this.props.fetchGroups();
            const fetchGroupsFromUser = this.props.fetchGroupsFromUser(this.props.currentUserId);
            Promise.all([fetchGroups, fetchGroupsFromUser])
                .then((data) => {
                    let userGroups = data[1].groups;
                    this.setState({ loaded: true, userGroups });
                })
        } else {
            const fetchGroups = this.props.fetchGroups();
            Promise.all([fetchGroups])
                .then(() => {
                    this.setState({ loaded: true });
            })
        }
    }

    render(){
        if(this.state.loaded){
            let userGroups = Object.values(this.state.userGroups);
            let suggestedGroups = Object.values(this.props.groups);
            let yourTitle = !userGroups.length ?
             (<Link 
                className="index-div-titles"
                to={'/login'}>
                Join a squad
            </Link>) : 
            (<p className="index-div-titles">
                Your Squads
            </p>)
            return(
                <div className="component-index">
                    <div className="landing-main-groups">
                        {yourTitle}
                        <GroupIndexList 
                            groups={userGroups}/>
                    </div>
                    <div className="landing-main-groups">
                        <p className="index-div-titles">
                            All Squads
                        </p>
                        <GroupIndexList
                            groups={suggestedGroups}/>
                    </div>
                </div>
                
            )
        } else {
            return (<div></div>)
        }
    }
        
}

export default GroupIndex