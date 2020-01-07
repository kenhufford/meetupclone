import React from 'react'

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
    const{list} = this.props
    const{listOpen} = this.state

    return(
        <div className="create-group-card-dropdown">
            <div className="create-group-card-dropdown-header" onClick={() => this.toggleList()}>
                <div className="create-group-card-dropdown-header-title">Change Location</div>
                <i className="fas fa-caret-down"></i>
            </div>
            {listOpen && <ul className="create-group-card-dropdown-header-list">
                {list.map((item) => (
                    <li className="create-group-card-dropdown-header-list-item" key={item.location} 
                    onClick={() => {
                        this.props.toggleItem(item.id, item.key)
                        this.handleClickOutside();
                    }}
                    >{item.location}</li>
                ))}
            </ul>}
        </div>
    )
  }
}

export default CreateGroupFormDropdown