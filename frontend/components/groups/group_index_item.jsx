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
        const {id, name, description, lat, long, imageUrl, membershipIds} = this.props.group
        return(
                <a key={id} href={`#/groups/${id}`} className="index-item"> 
                    <img className="index-item-image" src={window[imageUrl]} alt=""/>
                    <div className="index-item-image-text">
                        <p className="index-item-image-text-big">{name}</p>
                        <p className="index-item-image-text-small" >{membershipIds.length} members</p>
                    </div>
                </a>

        )
        }
    }
}

export default GroupIndexItem;