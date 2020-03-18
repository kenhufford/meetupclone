import React, {useState, useEffect} from 'react';
import CategoryIndexItem from './category_index_item';
import useFetches from '../hooks/use_fetches';

function CategoryIndex(props){
    let [loaded, setLoaded] = useState(false);
    useFetches(setLoaded, props.fetchCategories);
    if(loaded){
        let {categories} = props
        return (
            <div className="landing-main-groups">
                <div className="groups-div">
                    {Object.values(categories).map((category) => (
                        <CategoryIndexItem
                            key={category.id}
                            category={category} />
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
        
        
}

export default CategoryIndex