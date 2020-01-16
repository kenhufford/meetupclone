import React from 'react';
import CreateGroupFormDropdown from '../groups/create_group_form_dropdown'
import {formatDateInput} from '../../utils/date_util'

class CreateEventForm extends React.Component{
    constructor(props){
        super(props)
        let {title, description, maxAttendance, startTime, endTime, locationId, imageUrl, address, groupId} = this.props.event

        this.state = {
            event: {
                title: title,
                description: description,
                maxAttendance: maxAttendance,
                startTime: startTime,
                endTime: endTime,
                locationId: locationId,
                imageUrl: imageUrl,
                address: address,
                groupId: groupId,
            },
            selectedLocation: this.props.selectedLocation,
            loaded: true,
            currentSlide: 0,
            errorMessage: "",
            eventId: this.props.eventId,
            locations: this.props.locations,
        }
        this.handleStep = this.handleStep.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }


    componentDidMount(){
        const fetchLocations = this.props.fetchLocations()
        Promise.all([fetchLocations])
            .then( (payload) => {
                this.setState({
                    loaded: true,
                    locations: Object.values(payload[0].locations)
                })
            }
        )
    }

    handleStep(type){
        return () => {
            let {title, description, maxAttendance, startTime, endTime, 
                locationId, imageUrl, address, groupId} = this.state.event
            let {selectedLocation} = this.state
            let slide = this.state.currentSlide;
            let eventId = this.state.eventId;
            if (slide === 4 && description.length >= 10 && type==="next") {
                let eventInfo = {
                    id: eventId,
                    title: title,
                    description: description,
                    max_attendance: maxAttendance,
                    start_time: startTime,
                    end_time: endTime,
                    location_id: locationId,
                    image_url: imageUrl,
                    group_id: groupId,
                    address: address
                }
                this.props.action(eventInfo)
                    .then( (payload) => {
                        window.location.href = (`#/groups/${payload.event.groupId}/events/${payload.event.id}`)
                    })
                }
            else if (slide === 0 && selectedLocation===undefined && type==="next"){
                this.setState({
                    errorMessage: "Please select a location"
                })
            } else if (slide === 0 && address.length<2 && type==="next"){
                this.setState({
                    errorMessage: "Please enter an address"
                })
            } else if (slide === 0 && !(Number.isInteger(parseInt(maxAttendance))) && type==="next"){
                this.setState({
                    errorMessage: "Please enter an integer for max attendance"
                })
            } else if (slide === 1 && (startTime.length===0 || endTime.length===0) && type==="next"){
                this.setState({
                    errorMessage: "Please select start and end times for the brawl"
                })
            } else if (slide === 2 && title.length<3 && type==="next"){
                this.setState({
                    errorMessage: "Please enter more than 3 characters for the event title"
                })
            } else if (slide === 3 && description.length <= 10 && type==="next"){
                this.setState({
                    errorMessage: "Please enter more than 10 characters for the description"
                })
            } else {
                slide = (type === "prev") ? slide-1 : slide+1
                if (slide < 0){
                    this.props.history.push(`/groups/`)
                }
                this.setState({
                    currentSlide: slide,
                    errorMessage: ""
                })}
        }
    }

    update(key){
        return e => {
            let newState = Object.assign({}, this.state)
            newState.event[key] = e.currentTarget.value
            this.setState({
                newState
            })
        }
    }

    handleClick(key){
        return e =>{
            e.preventDefault();
            let newState = Object.assign({}, this.state)
            newState.event.imageUrl = `default${key+1}URL`;
            this.setState({
                newState
            })
        }
    }

    toggleSelected(index){
        let loc = this.state.locations[index]
        let newStateEvent = Object.assign({}, this.state.event)
        newStateEvent.locationId = loc.id
        let selectedLocation = loc.name
        this.setState({
            event: newStateEvent,
            selectedLocation: selectedLocation
        })
    }

    render(){
        if (this.state.loaded){
            let slide0 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">First, where is your brawl located?</h3>
                    <p className="create-group-card-description">Pick a good location for your brawl.  Think about ambiance, max capacity of the venue, proximity to emergency services.</p>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                    <div className="create-group-card-options">
                        <p className="create-group-card-selected">{this.state.selectedLocation}</p>
                        <CreateGroupFormDropdown location={this.state.selectedLocation} list={this.state.locations} toggleLocation={this.toggleSelected} />
                    </div>
                    <div className="create-group-card-options">
                        <input className="create-group-card-name-field" type="text" value={this.state.event.address}  placeholder="Address here" onChange={this.update('address')}/>
                    </div>
                    <p className="create-group-card-description">Set a maximum attendance of the venue.</p>
                    <div className="create-group-card-options">
                        <input className="create-group-card-name-field" type="text" value={this.state.event.maxAttendance}  placeholder="9000" onChange={this.update('maxAttendance')}/>
                    </div>
                </div>
            )
    
            let slide1 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">When will the brawl begin and end?</h3>
                    <p className="create-group-card-description">Be careful with time travel! We will not be responsible for changes to time/space as a result of irresponsible time-brawling.</p>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                    <div className="create-group-card-options">
                        <div className="create-group-card-options-dates">
                            <label className="create-group-card-options-dates-category">Brawl Begins
                                <input
                                onChange={this.update("startTime")}
                                className="date"
                                type="date"
                                value={formatDateInput(this.state.event.startTime)}>
                                </input>
                            </label>
                            <label className="create-group-card-options-dates-category">Brawl Ends
                                <input
                                onChange={this.update("endTime")}
                                className="date"
                                type="date"
                                value={formatDateInput(this.state.event.endTime)}>
                                </input>
                            </label>
                        </div>
                    </div>
                </div>
            )
    
            let slide2 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">What will your brawl be named?</h3>
                    <p className="create-group-card-description">Pick something that will attract challengers from all corners of thise universe.</p>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                    <div className="create-group-card-options">
                        <input className="create-group-card-name-field" type="text" value={this.state.event.title}  placeholder={this.state.selectedLocation + "'s Biggest Brawl"} onChange={this.update('title')}/>
                    </div>
                </div>
            )
    
            let slide3 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">Describe the brawl, what the challengers should expect, what to bring and what to wear.</h3>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                    <div className="create-group-card-options">
                        <textarea className="create-group-card-name-field-big" type="text" value={this.state.event.description} placeholder="Please enter at least 10 characters" onChange={this.update('description')}/>
                    </div>
                </div>
            )
    
            let urls = ["default1URL", "default2URL", "default3URL", "default4URL", "default5URL", "default6URL"]
            let slide4 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">Final Step before finalizing the brawl</h3>
                    <p className="create-group-card-description">Select an image to represent the brawl</p>
                    <div className="create-event-images">
                        {urls.map( (url, i) => {
                            return (<div onClick={this.handleClick(i)} key={i}>
                                <img  className={this.state.event.imageUrl===url ? "create-event-image-selected" : "create-event-image"} 
                                    value="i" src={window[url]} alt=""/>
                            </div>)
                        })}
                    </div>
                </div>
            )
    
            let slides = [slide0, slide1, slide2, slide3, slide4]
            let completion = `create-group-completion-${this.state.currentSlide}`
            return(
                <div className="create-group-main-div">
                    <span className={completion}></span>
                    <span className="create-group-completion"></span>
                    <p className="create-group-completion-text">Step {this.state.currentSlide+1} of {slides.length}</p>
                    <div className="create-group-div">
                        {slides[this.state.currentSlide]}
                    </div>
                    <footer className="create-group-footer">
                        <div>
                            <button onClick={this.handleStep('prev')} className="create-group-footer-prev">Prev</button>
                        </div>
                        <div>
                            <button onClick={this.handleStep('next')} className="create-group-footer-next">Next</button>
                        </div>
                    </footer>
                </div>
            )
        } else {
            return (<div></div>)
        }
        
    }
}

export default CreateEventForm