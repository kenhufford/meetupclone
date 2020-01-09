import React from 'react';
import CreateGroupFormDropdown from './create_group_form_dropdown'

class EditGroupForm extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchCategories();
        this.props.fetchLocations();
        this.props.fetchGroup();
    }

    render(){
        if (!this.state.location || !this.state.categories) return null
        return(
            <div>
                <CreateGroupForm props={this.props} groupId={this.props.match.params.groupId}/>
            </div>

        )
    }
}

export default EditGroupForm;