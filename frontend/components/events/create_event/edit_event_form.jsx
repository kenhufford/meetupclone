import React, {useState} from 'react';
import CreateEventForm from './create_event_form';
import useFetches from '../../hooks/use_fetches';

const EditEventForm = props => {
    const {fetchLocations, fetchEvent} = props;
    const [loaded, setLoaded] = useState(false)
    useFetches(setLoaded, [], fetchLocations, [fetchEvent, props.match.params.eventId])

    if (loaded){
        return(
            <div>
                <CreateEventForm 
                    event={props.event} 
                    eventId={props.match.params.eventId} 
                    locations={props.locations}
                    fetchLocations={props.fetchLocations}
                    action={props.action}
                    selectedLocation={props.selectedLocation}/>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default EditEventForm;