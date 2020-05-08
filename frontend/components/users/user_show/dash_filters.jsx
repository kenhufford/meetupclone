import React from 'react';
import DashFilterCard from './dash_filter_card';

const DashFilters = props => {
    let {cards, title} = props;
    let filterDefaults = ["Filter by squad","Filter by brawl"]
    return (
        <div className="filters-div">
            {cards.map((card,i) => 
                <DashFilterCard
                key={i}
                card={card}
                filterDefaults={filterDefaults}/>
                )}
            <p className="filters-div-title">{title}</p>
        </div>
    )
}

export default DashFilters;