import React from 'react';
import DropdownFilters from './dropdown_filters';

const DashFilterCard = props => {
    let { selectedName, setSelectedId, setToUndefined, userItems} = props.card;
    let selected = !(selectedName === "Filter by squad" || selectedName === "Filter by brawl")
    let card =  <div className="filter-card-left">
                    <div className={selected ? "filter-card-title-selected" : "filter-card-title-not"}>
                        {selectedName}
                    </div>
                </div>
    let filters = userItems.map(item => {
        return {
                setSelectedId:()=>{
                setSelectedId(item.id);
                if (setToUndefined){
                    setToUndefined(undefined);
                }
            }, 
            name: item.title || item.name}
    })
    return (
        <div className={selected ? "filter-card-selected" : "filter-card-not" }>
            <DropdownFilters
                title={card}
                filters={filters}
                selected={selected}
                />
        </div>
    )
}

export default DashFilterCard;