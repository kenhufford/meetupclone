import React from 'react';

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
        const fetchGroup = this.props.fetchGroup(this.props.match.params.groupId);
        Promise.all([fetchCategories, fetchLocations, fetchGroup])
        .then( () => this.setState({loaded:true}))
    }

    render(){
        if (this.state.loaded){
            debugger
            return(
                <div>
                    <CreateGroupForm props={this.props} groupId={this.props.match.params.groupId} categorySelected={true}/>
                </div>
            )
        } else {
            return (<div></div>)
        }

    }
}

export default EditGroupForm;