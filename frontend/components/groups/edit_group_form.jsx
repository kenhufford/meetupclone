import React from 'react';
import CreateGroupFormDropdown from './create_group_form_dropdown'

class EditGroupForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        const fetchCategories = this.props.fetchCategories();
        const fetchLocations = this.props.fetchLocations();
        const fetchGroup = this.props.fetchGroup();
        Promise.all([fetchCategories, fetchLocations, fetchGroup])
        .then( () => this.setState({loaded:true}))
    }

    render(){
        if (this.state.loaded){
            return(
                <div>
                    <CreateGroupForm props={this.props} groupId={this.props.match.params.groupId}/>
                </div>
            )
        } else {
            return (<div></div>)
        }

    }
}

export default EditGroupForm;