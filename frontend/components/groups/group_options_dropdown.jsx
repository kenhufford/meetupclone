import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import onClickOutside from "react-onclickoutside";

class GroupOptionsDropdown extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            listOpen: false,
            currentUserMember: this.props.currentUserMember,
            toGroupIndex: false
          }
        this.handleJoin = this.handleJoin.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleList = this.toggleList.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.currentUserMember !== prevState.currentUserMember){
            return ({
                currentUserMember: nextProps.currentUserMember
            })
        } else {
            return null
        }
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
        debugger
        if (!this.props.currentUser){
            document.location.href = '#/login'
        } else {
            this.props.createMembership(this.props.groupId)
            this.setState({
                listOpen: false,
                currentUserMember: true
            })
        }
        
    }

    handleRemove(){
        if (!this.props.currentUser){
            document.location.href = '#/login'
        } else if (this.props.totalMembers === 1){
            this.props.deleteGroup(this.props.groupId)
            .then( () => {
                this.setState({toGroupIndex: true})
            })
        } else {
            this.props.deleteMembership(this.props.groupId)            
            this.setState({
                listOpen: false,
                currentUserMember: false
            })
        }
        
    }

    handleDeleteGroup(){
        if (!this.props.currentUser){
            document.location.href = '#/login'
        } else {
            this.props.deleteGroup(this.props.groupId)
                .then( () => {
                    this.setState({toGroupIndex: true})
                })
        }
    }

    render(){

        if (this.state.toGroupIndex === true) {
            return <Redirect to='/groups' />
          }
        
        let {currentUserCaptain, groupId} = this.props
        let {currentUserMember} = this.state
        const{listOpen} = this.state
        let dropdownTitle; 
        if (currentUserMember && currentUserCaptain){
            dropdownTitle = (
                <div className="create-group-card-dropdown-header-title-div">
                    <div className="create-group-card-dropdown-header-title" onClick={this.toggleList}>
                    You're a Squad Captain</div>
                    <i className="fas fa-caret-down"></i>
                </div>)
        } else if (currentUserMember){
            dropdownTitle = (
                <div className="create-group-card-dropdown-header-title-div">
                    <div className="create-group-card-dropdown-header-title" onClick={this.toggleList}>
                    You're a member</div>
                    <i className="fas fa-caret-down"></i>
                </div>)

        } else {
            dropdownTitle = (
                <div className="create-group-card-dropdown-header-title-div">
                    <div className="create-group-card-dropdown-header-title" onClick={this.handleJoin}>
                    Join Squad
                    </div>
                </div>)
        }

        let dropdownOption1 = !currentUserCaptain ?
            ( <li className="create-group-card-dropdown-option-hidden"></li>) :
            ( <Link to={`/groups/form/${groupId}/edit`} className="create-group-card-dropdown-option">Edit Group</Link>)
        let dropdownOption2 = !currentUserCaptain ?
            ( <li className="create-group-card-dropdown-option-hidden"></li>) :
            ( <li onClick={()=>this.handleDeleteGroup()} className="create-group-card-dropdown-option">Delete Group</li>)
        let dropdownOption3 = !currentUserCaptain ?
            ( <li className="create-group-card-dropdown-option-hidden"></li>) :
            ( <Link to={`/events/new/${groupId}`} className="create-group-card-dropdown-option">Start a Brawl</Link>)
        
        return(
            
            <div className="create-group-card-dropdown">
                <div className="create-group-card-dropdown-header" onClick={() => this.toggleList()} >
                    {dropdownTitle}
                </div>
                {listOpen && <ul className="create-group-card-dropdown-header-list">
                    <li onClick={this.handleRemove} className="create-group-card-dropdown-option">Leave the Group</li>
                    {dropdownOption1}
                    {dropdownOption2}
                    {dropdownOption3}
                </ul>}
            </div>
        )
    }
}

export default onClickOutside(GroupOptionsDropdown)