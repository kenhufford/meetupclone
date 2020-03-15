import React from 'react';
import CreateGroupFormDropdown from './create_group_form_dropdown'

class CreateGroupForm extends React.Component{
    constructor(props){
        super(props)
        let {name, description, lat, long, imageUrl, selectedLocationId, selectedLocation} = this.props.group
        let {categorySelected} = this.props
        this.state = {
            loaded: false,
            name: name,
            description: description,
            lat: lat,
            long: long,
            imageUrl: imageUrl,
            currentSlide: 0,
            selectedLocation: selectedLocation,
            selectedLocationId: selectedLocationId,
            errorMessage: "",
            categorySelected: categorySelected
        }
        this.handleStep = this.handleStep.bind(this);
        this.handleClickPic = this.handleClickPic.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    componentDidMount(){
        const fetchCategories = this.props.fetchCategories();
        const fetchLocations = this.props.fetchLocations();
        Promise.all([fetchCategories, fetchLocations])
        .then( (data) => {
            let {group} = this.props;
            let selectedLocation;
            let locations = Object.values(data[1].locations);
            let categories = Object.values(data[0].categories);
            for (let i = 0; i < locations.length; i++) {
                locations[i].key = 'location';
                locations[i].selected = (locations[i].id === group.locationId)
                if (group.locationId === locations[i].id) selectedLocation = locations[i].name
            }
            for (let i = 0; i < categories.length; i++) {
                categories[i].key = 'category';
                categories[i].selected = group.categoryIds.includes(categories[i].id)
            }

            this.setState({
                selectedLocation,
                categories,
                location,
                loaded: true
            })
        })
    }

    handleStep(type){
        return () => {
        let slide = this.state.currentSlide;
        let groupId = this.props.match.params.groupId;
        let catArray = [];
        if (slide === 4 && this.state.description.length >= 20 && type==="next") {
            let {categories} = this.state;
                for(let i = 0; i < categories.length; i++){
                    if (categories[i].selected) {
                        catArray.push(categories[i].id)
                    }
                }
           
            let groupInfo = {
                id: groupId,
                name: this.state.name,
                description: this.state.description,
                lat: this.state.lat,
                long: this.state.long,
                image_url: this.state.imageUrl,
                location_id: this.state.selectedLocationId,
                category_ids: catArray,
                icon_url: "defaultchannel8URL"
            }
            this.props.action(groupInfo)
                .then( (payload) => {
                    this.props.history.push(`/groups/${payload.group.id}`)
                })
            }
        else if (slide === 0 && this.state.selectedLocation===undefined && type==="next"){
            this.setState({
                errorMessage: "Please select a location"
            })
        } else if (slide === 1 && !this.state.categorySelected && type==="next"){
            this.setState({
                errorMessage: "Please select a fighting style"
            })
        } else if (slide === 2 && this.state.name.length <= 4 && type==="next"){
            this.setState({
                errorMessage: "Please enter more than 4 characters"
            })
        } else if (slide === 3 && this.state.description.length <= 20 && type==="next"){
            this.setState({
                errorMessage: "Please enter more than 20 characters"
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
        return e => this.setState({
            [key]: e.currentTarget.value
        })
    }

    toggleSelected(index){
        let loc = this.props.locations[index]
        this.setState({
          selectedLocation: loc.name,
          selectedLocationId: loc.id
        })
    }

    handleClickPic(url){
        return e =>{
            e.preventDefault();
            this.setState({
                imageUrl: url
            })
        }
    }

    handleClick(categoryId){
        let temp = this.props.categories
        temp[categoryId-1].selected = !temp[categoryId-1].selected 
        this.setState({
            categories: temp,
            categorySelected: true
          })
    }

    render(){
        if (this.state.loaded){
            let slide0 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">First, where is your squad located?</h3>
                    <p className="create-group-card-description">Squads meet locally and in person. We will help you recruit warriors from across your region.</p>
                    <div className="create-group-card-options">
                        <CreateGroupFormDropdown 
                            location={this.state.selectedLocation} 
                            list={this.props.locations} 
                            toggleLocation={this.toggleSelected} />
                    </div>
                    <p className="create-group-card-selected">{this.state.selectedLocation}</p>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                </div>
            )
    
            let slide1 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">How would you describe your squad's fighting style</h3>
                    <p className="create-group-card-description">Be specific and don't be shy. We won't divulge the secret training methods of your squad.  We will help potential squad members find you!</p>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                    <div className="create-group-card-options">
                        <ul className="create-group-card-options-categories">
                            {this.props.categories.map( (category) => (
                                <li key={category.id}>
                                    <button onClick={() => this.handleClick(category.id)} 
                                    className={category.selected ? "create-group-card-options-categories-button-selected" : "create-group-card-options-categories-button"}>{category.name}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
    
            let slide2 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">What will your squad be named?</h3>
                    <p className="create-group-card-description">Take a deep breath and decide what name should be shouted for all eternity.  Will it be a name that inspires love?  Fear?  Or both.</p>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                    <div className="create-group-card-options">
                        <input className="create-group-card-name-field" type="text" value={this.state.name || ''}  placeholder={this.state.selectedLocation + "'s Big Beatdown Bullies"} onChange={this.update('name')}/>
                    </div>
                </div>
            )
    
            let slide3 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">Now describe what your squad is about.  Tenets.  Core Principles.  Power level requirements.</h3>
                    <p className="create-group-card-description">Potential recruits will see this when we promote your squad, so give it your all.</p>
                    <ol className="create-group-card-ol">
                        <li>What's the purpose of the squad?</li>
                        <li>Who should join?</li>
                        <li>What will you do at your events?</li>
                    </ol>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                    <div className="create-group-card-options">
                        <textarea className="create-group-card-name-field-big" type="text" value={this.state.description || ''} placeholder="Please enter at least 20 characters" onChange={this.update('description')}/>
                    </div>
                </div>
            )
            let defaultURL;
            if (this.state.imageUrl !== '') {
                defaultURL = this.state.imageUrl;
            } else {
                defaultURL = "defaultg1URL";
            }
            let urls = [defaultURL, "defaultg5URL", "defaultg6URL", "defaultg4URL", "defaultg2URL", "defaultg3URL"]

            let slide4 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">Final step before forming your own squad.</h3>
                    <p className="create-group-card-description">Select an image to proudly represents the spirit of your squad.</p>
                    <div className="create-event-images">
                        {urls.map( (url, i) => {
                            return (<div onClick={this.handleClickPic(url)} key={i}>
                                <img  className={this.state.imageUrl===url ? "create-event-image-selected" : "create-event-image"} 
                                    value="i" src={window[url]} alt=""/>
                            </div>)
                        })}
                    </div>
                </div>
            )
    
            let slides = [slide0, slide1, slide2, slide3, slide4]
            let completion = `progress-bar progress-bar-${this.state.currentSlide}`
            return(
                <div className="create-group-main-div">
                    <span className={completion}></span>
                    <span className="progress"></span>
                    <p className="create-group-completion-text">Step {this.state.currentSlide+1} of {slides.length}</p>
                    <div className="create-group-div">
                        {slides[this.state.currentSlide]}
                    </div>
                    <footer className="create-group-footer">
                        <div>
                            <button onClick={this.handleStep('prev')} className="create-group-footer-next">Prev</button>
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

export default CreateGroupForm