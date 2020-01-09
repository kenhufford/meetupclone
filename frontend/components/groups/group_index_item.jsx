import React from 'react';
import {Link} from 'react-router-dom'

class GroupIndexItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if (!this.props.group){
            return null
        } else {
        const {id, name, description, lat, long, imageUrl, memberships} = this.props.group
        return(
                <a key={id} href={`#/groups/${id}`} className="groups-index-item"> 
                    <img className="groups-index-item-image" src={window[imageUrl]} alt=""/>
                    <div className="groups-index-item-image-text">
                        <p className="groups-index-item-image-text-big">{name}</p>
                        <p className="groups-index-item-image-text-small" >{memberships.length} members</p>
                    </div>
                </a>

        )
        }
    }
}

export default GroupIndexItem;