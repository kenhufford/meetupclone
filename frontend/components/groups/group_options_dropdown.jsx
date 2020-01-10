import React from 'react'
import {Link} from 'react-router-dom'
import onClickOutside from "react-onclickoutside";

class GroupOptionsDropdown extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listOpen: false,
            currentUserMember: this.props.currentUserMember
          }
        this.handleJoin = this.handleJoin.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleList = this.toggleList.bind(this);
        
    }

    handleClickOutside(){
        this.setState({
          listOpen: false
        })
      }
    
    toggleList(){
        if (!this.state.currentUserMember) return null
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    handleJoin(){
        if (!this.props.currentUserId){
            document.location.href = '#/login'
        } else {
            this.props.createMembership(this.props.groupId)
            .then( () => this.setState({
                listOpen: false,
                currentUserMember: true
            }))
        }
    }

    handleRemove(){
        console.log("im removing membership")
        if (!this.props.currentUserId){
            document.location.href = '#/login'
        } else {
            this.props.deleteMembership(this.props.groupId)            
            .then( () => this.setState({
                listOpen: false,
                currentUserMember: false
            }))
        }
    }

    handleDeleteGroup(){
        console.log("im deleting")
        if (!this.props.currentUserId){
            document.location.href = '#/login'
        } else {
            this.props.deleteGroup(this.props.groupId)            
                .then( () => document.location.href = '#/groups')
        }
    }

    render(){
        let {currentUserOrganizer, groupId} = this.props
        let {currentUserMember} = this.state
        const{listOpen} = this.state
        let dropdownTitle = !currentUserMember ? 
            (<div className="create-group-card-dropdown-header-title" onClick={this.handleJoin}>
                Join Group
            </div>):
            (<div className="create-group-card-dropdown-header-title" onClick={this.toggleList}>
                You're a member
            </div>)
        let dropdownOption1 = !currentUserOrganizer ?
            ( <li className="create-group-card-dropdown-option"></li>) :
            ( <Link to={`/groups/${groupId}/edit`} className="create-group-card-dropdown-option">Edit Group</Link>)
        let dropdownOption2 = !currentUserOrganizer ?
            ( <li className="create-group-card-dropdown-option"></li>) :
            ( <li onClick={()=>this.handleDeleteGroup()} className="create-group-card-dropdown-option">Delete Group</li>)
        
        return(
            
            <div className="create-group-card-dropdown">
                <div className="create-group-card-dropdown-header" onClick={() => this.toggleList()} >
                    {dropdownTitle}
                    <i className="fas fa-caret-down"></i>
                </div>
                {listOpen && <ul className="create-group-card-dropdown-header-list">
                    <li onClick={this.handleRemove} className="create-group-card-dropdown-option">Leave the Group</li>
                    {dropdownOption1}
                    {dropdownOption2}
                </ul>}
            </div>
        )
    }
}

export default onClickOutside(GroupOptionsDropdown)