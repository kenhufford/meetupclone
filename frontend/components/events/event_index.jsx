import React from 'react';
import debounce from "lodash.debounce";
import EventIndexItemLarge from './event_index_item_large';
import {addWeek, addMonth, formatDateWithMonth } from '../../utils/date_util';

class EventIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            error: false,
            hasMore: true,
            isLoading: false,
            userBrawls: [],
            allBrawls: [],
            displayedBrawls: [],
            noUserBrawls: true,
            eventIndex: 10
        }
    
    this.handleSignup = this.handleSignup.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
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
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 100){
                loadEvents();
            }
        }, 200);
    }

    componentWillUnmount(){
        window.removeEventListener('onscroll', debounce);
    }

    loadEvents(){
        this.setState({
            isLoading: true}, ()=>{
                let allBrawls = this.state.allBrawls;
                let eventIndex = this.state.eventIndex + 10;
                let hasMore = this.state.hasMore;
                let loaded = this.state.loaded;
                if (eventIndex > allBrawls.length && this.state.loaded) {
                    hasMore = false;
                } else {
                    hasMore = true;
                }
                this.setState({
                    displayedBrawls: allBrawls.slice(0, eventIndex),
                    eventIndex,
                    hasMore
                }, () => {
                    this.setState({ isLoading: false })
                })
            }
        )
    }

    handleSignup(){
        if (this.props.currentUserId === ""){
            document.location.href = '#/signup'
        } else {
            return null
        }
    }

    componentDidMount(){
        const fetchEvents = this.props.fetchEvents();
        const fetchGroups = this.props.fetchGroups();
        const fetchLocations = this.props.fetchLocations();
        const fetchReservations = this.props.fetchReservations(0);
        let eventIndex = this.state.eventIndex;
        Promise.all([fetchEvents, fetchGroups, fetchReservations, fetchLocations])
            .then( (data) => {
                let userEventIds = data[2].reservations.userReservations.map(reservation => {
                    return reservation.eventId
                })
                let noUserBrawls = true;
                let events= data[0].events;
                let allBrawls = [];
                let userBrawls = [];
                Object.values(events).map(brawl => {
                    switch (brawl.recurringType) {
                        case "Weekly":
                            for (let i = 1; i < 16; i++) {
                                let brawl1 = Object.assign({}, brawl);
                                brawl1.startTime = addWeek(brawl.startTime, i);
                                brawl1.endTime = addWeek(brawl.endTime, i);
                                allBrawls.push(brawl1);
                                if (userEventIds.includes(brawl.id)) userBrawls.push(brawl);
                            }
                            break
                        case "Monthly":
                            for (let i = 1; i < 4; i++) {
                                let brawl1 = Object.assign({}, brawl);
                                brawl1.startTime = addMonth(brawl.startTime, i);
                                brawl1.endTime = addMonth(brawl.endTime, i);
                                allBrawls.push(brawl1);
                                if (userEventIds.includes(brawl.id)) userBrawls.push(brawl);
                            }
                        default:
                            allBrawls.push(brawl);
                            if (userEventIds.includes(brawl.id)) userBrawls.push(brawl);
                            break;
                    }
                })
                if (userBrawls.length > 0) noUserBrawls = false;
                allBrawls.sort(function (a, b) {
                    return new Date(a.startTime) - new Date(b.startTime)
                })
                userBrawls.sort(function (a, b) {
                    return new Date(a.startTime) - new Date(b.startTime)
                })
                
                this.setState({
                    loaded:true,
                    noUserBrawls,
                    allBrawls,
                    displayedBrawls: allBrawls.slice(0,eventIndex),
                    userBrawls,
                    eventIndex:10
                })
            })
        }

    render(){
        console.log("hello new change")
        if(this.state.loaded){
            let {locations } = this.props;
            let {userBrawls, displayedBrawls, noUserBrawls, isLoading} = this.state;
            let lastMonth;

            let userlist = (
                (<ul className="group-show-events-list">
                    {userBrawls.map((brawl) => {
                        let thisMonth = formatDateWithMonth(brawl.startTime);
                        let diffMonth = thisMonth !== lastMonth;
                        lastMonth = thisMonth;
                        let {recurringType} = brawl
                        let recurring = (recurringType === "None") ? (<p>One Time Brawl</p>) : (<p>Brawl Occurring {recurringType}</p>)
                        return (
                            <EventIndexItemLarge
                                recurring={recurring}
                                diffMonth={diffMonth}
                                thisMonth={thisMonth}
                                brawl={brawl}
                                locations={locations}
                                key={brawl.id}
                            />
                        )
                    })}
                </ul>)
            )
            let list =
                (<ul className="group-show-events-list">
                    {displayedBrawls.map((brawl) => {
                        let thisMonth = formatDateWithMonth(brawl.startTime);
                        let diffMonth = thisMonth !== lastMonth;
                        lastMonth = thisMonth;
                        let {recurringType} = brawl;
                        let recurring = (recurringType === "None") ? (<p>One Time Brawl</p>) : (<p>Brawl Occurring {recurringType}</p>)
                        return (
                           <EventIndexItemLarge 
                                recurring={recurring}
                                diffMonth={diffMonth}
                                thisMonth={thisMonth}
                                brawl={brawl}
                                locations={locations}
                                key={brawl.id}
                                key2={brawl.id}
                                // why doesn't this work?
                                // new comment to show stuff
                                //another new comment
                            />
                        )
                    })}
                </ul>)

            return (

                <div className="index-div">
                    {noUserBrawls ? <p className="index-div-titles-mid"></p> : <p className="index-div-titles-mid">YOUR BRAWLS</p>}
                    <div className="group-show-events-main">
                        {userlist}
                        <p className="index-div-titles-mid">UPCOMING BRAWLS</p>
                        {list}
                        {isLoading &&
                            <div>Loading...</div>
                        }
                    </div>
                </div>

            )

        } else {
            return (
                <div></div>
            )
        }
        
    }
        
}

export default EventIndex