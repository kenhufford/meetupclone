import React from 'react';

const EventIndexItem = (props) =>{
    const { title, groupId, imageUrl, id, name} = props.event
    if (name!==undefined){
        return (
            <div className="index-item"
                key={`event${id}`}>
                <a href={`#/groups/${groupId}/events/${id}`} >
                    <img className="index-item-image"
                        src={window[imageUrl]} alt="" />
                    <div className="index-item-image-text">
                        <p className="index-item-image-text-big">
                            {title}
                        </p>
                        <p className="index-item-image-text-small">
                            Hosted By: {name}
                        </p>
                    </div>
                </a>
            </div>
        )
    } else {
        return (<div> </div>)
    }
}

export default EventIndexItem;