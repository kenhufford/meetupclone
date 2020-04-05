import React from 'react';
import { addWeek, addMonth, formatDateWithMonth } from '../../../utils/date_util';
import EventIndexItemLarge from './event_index_item_large';
import debounce from "lodash.debounce";

class EventIndexList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: false,
            hasMore: true,
            isLoading: false,
            eventIndex: 10
        }
        this.loadEvents = this.loadEvents.bind(this)
        window.onscroll = debounce(() => {
            const {
                loadEvents,
                state: {
                    error,
                    isLoading,
                    hasMore,
                }
            } = this;
            if (error || isLoading || !hasMore) return;
            if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 100) {
                loadEvents();
            }
        }, 200);
    }

    componentWillUnmount() {
        window.removeEventListener('onscroll', debounce);
    }

    loadEvents() {
        this.setState({
            isLoading: true
        }, () => {
            let allBrawls = this.props.events;
            let eventIndex = this.state.eventIndex + 10;
            let hasMore = this.state.hasMore;
            if (eventIndex > allBrawls.length && this.state.loaded) {
                hasMore = false;
            } else {
                hasMore = true;
            }
            this.setState({
                eventIndex,
                hasMore
            }, () => {
                this.setState({ isLoading: false })
            })
        }
        )
    }

    render(){
        let { events, locations } = this.props;
        let {isLoading, eventIndex} = this.state;
        let allBrawls = [];
        Object.values(events).map(brawl => {
            switch (brawl.recurringType) {
                case "Weekly":
                    for (let i = 1; i < 16; i++) {
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
        allBrawls = allBrawls.slice(0, eventIndex+1);
        return (
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
                            key={i*brawl.id}
                        />
                    )
                })}
                {isLoading &&
                    <div>Loading...</div>
                }
            </ul>
        )
    }
    
}


export default EventIndexList;