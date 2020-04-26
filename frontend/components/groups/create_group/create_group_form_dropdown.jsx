import React from 'react'
import onClickOutside from "react-onclickoutside";

class CreateGroupFormDropdown extends React.Component{
    constructor(props){
    super(props)
    this.state = {
      listOpen: false
    }
  }

  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list, location} = this.props
    const{listOpen} = this.state
    if (list.length===0) return null;
    return(
        <div className="create-group-card-dropdown">
          <div className="create-group-card-dropdown-header" 
            onClick={() => this.toggleList()}>
          <div className="create-group-card-dropdown-header-title">
            {(location === "" || location===undefined) ? "Change Location" : location}
          </div>
          {listOpen ? <i className="fas fa-caret-down dropdown-caret-up"></i> : <i className="fas fa-caret-down dropdown-caret-down"></i>}
            </div>
            {listOpen && <ul className="create-group-card-dropdown-header-list">
                {list.map((location, index) => (
                    <li className="create-group-card-dropdown-header-list-item" key={index} 
                    onClick={() => {
                        this.props.toggleLocation(location.id)
                        this.handleClickOutside();
                    }}
                    >{location.name}</li>
                ))}
            </ul>}
        </div>
    )
  }
}

export default onClickOutside(CreateGroupFormDropdown)