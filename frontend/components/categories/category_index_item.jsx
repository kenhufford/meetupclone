import React from 'react';

function CategoryIndexItem(props){
    const { imageUrl, name, id } = props.category
    if (name===undefined){
        return (<div></div>)
    } else {
    return(
        <div className="index-item">
            <a key={id} href={`#/search/?category%20${id}`} > 
                <img className="index-item-image" 
                    src={window[imageUrl]} />
                <div className="index-item-image-text">
                    <p className="index-item-image-text-big">
                        {name}
                    </p>
                </div>
            </a>
        </div>
    )}
}

export default CategoryIndexItem;