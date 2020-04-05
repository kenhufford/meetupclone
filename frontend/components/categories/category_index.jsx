import React, {useState} from 'react';
import CategoryIndexItem from './category_index_item';
import useFetches from '../hooks/use_fetches';

function CategoryIndex(props){
    let { categories, fetchCategories } = props
    let [loaded, setLoaded] = useState(false);
    useFetches(setLoaded, fetchCategories);
    if(loaded){
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