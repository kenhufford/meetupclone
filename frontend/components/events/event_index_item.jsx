import React from 'react';

class EventIndexItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {title, groupId, imageUrl, id} = this.props.event
        const {groups} = this.props
        if (!this.props.event || !this.props.groups[groupId]){
            return null
        } else {
        return(
            <div className="index-item">
                <a key={groupId} href={`#/groups/${groupId}/events/${id}`} > 
                    <img className="index-item-image" src={window[imageUrl]} alt=""/>
                    <div className="index-item-image-text">
                        <p className="index-item-image-text-big">{title}</p>
                        <p className="index-item-image-text-small" >Hosted By: {groups[groupId].name}</p>
                    </div>
                </a>
            </div>

        )
        }
    }
}

export default EventIndexItem;