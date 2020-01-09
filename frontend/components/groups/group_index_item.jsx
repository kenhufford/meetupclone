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
        const {id, name, description, lat, long, image_url, memberships} = this.props.group
        return(
            <div  key={id} className="groups-index-item"> 
                <img src={image_url} alt=""/>
                <Link to={`/groups/${id}`}>{name}</Link>
                <p>{memberships.length} members</p>
            </div>
        )
        }
    }
}

export default GroupIndexItem;