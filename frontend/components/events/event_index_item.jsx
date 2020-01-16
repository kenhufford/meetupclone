import React from 'react';

class EventIndexItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if (this.props.event.name===undefined){
            return (<div> </div>)
        } else {
        const {title, groupId, imageUrl, id, name} = this.props.event
        return(
            <div className="index-item">
                <a key={groupId} href={`#/groups/${groupId}/events/${id}`} > 
                    <img className="index-item-image" src={window[imageUrl]} alt=""/>
                    <div className="index-item-image-text">
                        <p className="index-item-image-text-big">{title}</p>
                        <p className="index-item-image-text-small" >Hosted By: {name}</p>
                    </div>
                </a>
            </div>

        )}
    }
}

export default EventIndexItem;