import React from 'react';

const CategoryIndexItem = props =>{
    const { imageUrl, name, id } = props.category
    if (name){
        return(
            <div className="index-item">
                <a key={id} 
                    href={`#/search/?category%20${id}`} > 
                    <img className="index-item-image" 
                        src={window[imageUrl]} />
                    <div className="index-item-image-text">
                        <p className="index-item-image-text-big">
                            {name}
                        </p>
                    </div>
                </a>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default CategoryIndexItem;