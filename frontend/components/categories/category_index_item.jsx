import React from 'react';

class CategoryIndexItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if (this.props.category.name===undefined){
            return (<div> </div>)
        } else {
        const {imageUrl, name, id} = this.props.category
        return(
            <div className="index-item">
                <a key={id} href={`#/search/?category%20${id}`} > 
                    <img className="index-item-image" src={window[imageUrl]} alt=""/>
                    <div className="index-item-image-text">
                        <p className="index-item-image-text-big">{name}</p>
                    </div>
                </a>
            </div>

        )}
    }
}

export default CategoryIndexItem;