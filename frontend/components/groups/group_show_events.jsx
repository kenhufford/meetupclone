import React from 'react';
import {formatDate, addWeek, addMonth, formatDateWithMonth} from '../../utils/date_util'
import {Link} from 'react-router-dom'
class GroupShowEvents extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage: "All Scheduled Brawls"
        }
        this.switchPage = this.switchPage.bind(this);
    }

    switchPage(page){
        return () => {
        this.setState({
            currentPage: page
        })}
    }

    render(){
        let {events, locations} = this.props;
        let allBrawls = []
        events.map( brawl => {
            switch (brawl.recurringType) {
                case "Weekly":
                    for(let i = 1; i < 8; i++){
                        let brawl1 = Object.assign({}, brawl)
                        brawl1.startTime = addWeek(brawl.startTime, i)
                        brawl1.endTime = addWeek(brawl.endTime, i)
                        allBrawls.push(brawl1)
                    }
                    break
                case "Monthly":
                    for(let i = 1; i < 4; i++){
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
        allBrawls.sort(function(a,b){
            return new Date(a.startTime) - new Date(b.startTime)
          })
        let list = 
        (<ul className="group-show-events-list">

            {allBrawls.map ((brawl, i) => {
                let thisMonth = formatDateWithMonth(brawl.startTime);
                let diffMonth = thisMonth !== lastMonth;
                lastMonth = thisMonth;
                let {title, locationId, groupId, imageUrl, startTime, endTime, address,id, reservationIds, recurringType} = brawl
                let recurring = (recurringType === "None") ? (<p>One Time Brawl</p>) : (<p>Brawl Occurring {recurringType}</p>)
                return (
                    <div key={i} >
                        {diffMonth ? (<div className="group-show-event-datedivider">
                            {thisMonth}
                        </div>) :
                            <div> </div>}
                        <li className="group-show-events-li">
                            
                            <div className="group-show-events-event-div">
                                <div className="group-show-events-event-div-top">
                                    <p>{formatDate(startTime)}</p>
                                </div>
                                {recurring}
                                <div className="group-show-events-event-div-bottom">
                                    <div className="group-show-events-event-info">
                                        <span className="group-show-events-event-title">{title}</span>
                                        <Link to={`/search/?location%20${locationId}`}>{locations[locationId].name}</Link>
                                        <p>{reservationIds.length} challengers</p>
                                    </div>
                                    <div className="group-show-events-event-link">
                                        <Link to={`/groups/${groupId}/events/${id}`} >
                                            <img src={window[imageUrl]} alt="event-img" className="group-show-events-img" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                    
                )
            })}
        </ul>) 

        return (
            
            <div className="group-show-events">
                <div className="group-show-events-main">
                    <div className="group-show-events-header">
                        <p>{this.state.currentPage}</p>
                    </div>
                    {list}
                </div>
            </div>

        )
    }
}

export default GroupShowEvents;