import React from 'react';
import DashFilterCard from './dash_filter_card';

const DashFilters = props => {
    const {cards, title} = props;
    const filterDefaults = ["Filter by squad","Filter by brawl"]
    return (
        <div className="filters-div">
            <p className="filters-div-title">{title}</p>
            <div className="filters-div-cards-div">
                {cards.map((card, i) =>
                    <DashFilterCard
                        key={i}
                        card={card}
                        filterDefaults={filterDefaults} />
                )}
            </div>

        </div>
    )
}

export default DashFilters;