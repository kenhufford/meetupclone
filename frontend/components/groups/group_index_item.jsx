import React from 'react';

function GroupIndexItem(props){
    if (!props.group){
        return <div></div>
    } else {
    const {id, name, imageUrl, membershipIds} = props.group
    debugger
    return(
            <a key={`group${id}`} 
                href={`#/groups/${id}`} 
                className="index-item"> 
                <img className="index-item-image" 
                    src={window[imageUrl]} alt=""/>
                <div className="index-item-image-text">
                    <p className="index-item-image-text-big">
                        {name}
                    </p>
                    <p className="index-item-image-text-small" >
                        {membershipIds.length} members
                    </p>
                </div>
            </a>
        )   
    }
}

export default GroupIndexItem;