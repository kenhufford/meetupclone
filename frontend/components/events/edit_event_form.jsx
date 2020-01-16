import React from 'react';
import CreateEventForm from './create_event_form'

class EditEventForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        const fetchLocations = this.props.fetchLocations();
        const fetchEvent = this.props.fetchEvent(this.props.match.params.eventId);
        Promise.all([fetchLocations, fetchEvent])
        .then( () => this.setState({loaded:true}))
    }

    render(){
        if (this.state.loaded){
            return(
                <div>
                    <CreateEventForm 
                    event={this.props.event} 
                    eventId={this.props.match.params.eventId} 
                    locations={this.props.locations}
                    fetchLocations={this.props.fetchLocations}
                    action={this.props.action}
                    selectedLocation={this.props.selectedLocation}/>
                </div>
            )
        } else {
            return (<div></div>)
        }

    }
}

export default EditEventForm;