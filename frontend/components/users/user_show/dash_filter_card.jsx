import React from 'react';
import DropdownFilters from './dropdown_filters';

const DashFilterCard = props => {
    let { selectedName, setSelectedId, setToUndefined, userItems} = props.card;
    let card =  <div className="user-counts-card-left">
                    <div className="user-counts-card-title">{selectedName}</div>
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
        <div className="user-counts-card">
            <DropdownFilters
                title={card}
                filters={filters}
                />
        </div>
    )
}

export default DashFilterCard;