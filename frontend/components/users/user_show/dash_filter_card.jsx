import React from 'react';
import DropdownFilters from './dropdown_filters';

const DashFilterCard = props => {
    let {filterDefaults} = props;
    let { selectedName, setSelectedId, setToUndefined, userItems} = props.card;
    let selected = filterDefaults.includes(selectedName);
    let card =  <div className="filter-card-left">
                    <div className={selected ? "filter-card-title-selected" : "filter-card-title-not"}>
                        {selectedName}
                    </div>
                </div>
    let filters = userItems.map(item => {
        let name = item.title || item.name;
        if(name.length > 20) name = name.slice(0,19);
        return {
                setSelectedId:()=>{
                setSelectedId(item.id);
                if (setToUndefined){
                    setToUndefined(undefined);
                }
            }, 
            name}
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