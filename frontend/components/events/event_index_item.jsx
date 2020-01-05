import React from 'react';

class EventIndexItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let {title, groupId, description, maxAttendance, startTime, endTime, address, lat, long} = this.props.event
        return(
            <li>
                <p>{title}</p>
            </li>
        )
    }
}

export default EventIndexItem;