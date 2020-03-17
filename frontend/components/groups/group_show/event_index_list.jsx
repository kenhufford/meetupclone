import React from 'react';
import { addWeek, addMonth, formatDateWithMonth } from '../../../utils/date_util';
import EventIndexItemLarge from '../../events/event_index_item_large';

function EventIndexList(props){
    let { events, locations } = props;
    let allBrawls = []
    Object.values(events).map(brawl => {
        switch (brawl.recurringType) {
            case "Weekly":
                for (let i = 1; i < 8; i++) {
                    let brawl1 = Object.assign({}, brawl)
                    brawl1.startTime = addWeek(brawl.startTime, i)
                    brawl1.endTime = addWeek(brawl.endTime, i)
                    allBrawls.push(brawl1)
                }
                break
            case "Monthly":
                for (let i = 1; i < 4; i++) {
                    let brawl1 = Object.assign({}, brawl)
                    brawl1.startTime = addMonth(brawl.startTime, i)
                    brawl1.endTime = addMonth(brawl.endTime, i)
                    allBrawls.push(brawl1)
                }
            default:
                allBrawls.push(brawl)
                break;
        }
    })
    let lastMonth;
    allBrawls.sort(function (a, b) {
        return new Date(a.startTime) - new Date(b.startTime)
    })
    return(
        <ul className="group-show-events-list">
            {allBrawls.map((brawl, i) => {
                let thisMonth = formatDateWithMonth(brawl.startTime);
                let diffMonth = thisMonth !== lastMonth;
                lastMonth = thisMonth;
                let { recurringType } = brawl
                let recurring = (recurringType === "None") ? (<p>One Time Brawl</p>) : (<p>Brawl Occurring {recurringType}</p>)
                return (
                    <EventIndexItemLarge
                        recurring={recurring}
                        diffMonth={diffMonth}
                        thisMonth={thisMonth}
                        brawl={brawl}
                        locations={locations}
                        key={i}
                    />
                )
            })}
        </ul>
    )
}


export default EventIndexList;