import React from 'react';

function EventIndexItem(props){
    const { title, groupId, imageUrl, id, name} = props.event
    if (name===undefined){
        return (<div> </div>)
    } else {
        return(
            <div className="index-item">
                <a key={groupId} 
                    href={`#/groups/${groupId}/events/${id}`} > 
                    <img className="index-item-image" 
                        src={window[imageUrl]} alt=""/>
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
    }
}

export default EventIndexItem;