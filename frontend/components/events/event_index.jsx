import React from 'react';
import EventIndexItem from './event_index_item'

class EventIndex extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchAllEvents();
    }

    render(){
        return(
            <div className="event-index-div">
                <ul>
                    {this.props.events.map( event => (
                        <EventIndexItem event={event} key={event.id}/>
                    ))}
                </ul>
            </div>
        )
    }
}

export default EventIndex