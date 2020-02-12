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
            location: this.props.locations,
            categories: this.props.categories,
            categorySelected: categorySelected
        }
        this.handleStep = this.handleStep.bind(this);
        this.handleClickPic = this.handleClickPic.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.locations !== prevState.location || nextProps.categories !== prevState.categories ){
            return ({
                location: nextProps.locations,
                categories: nextProps.categories,
                selectedLocation: nextProps.selectedLocation
            })
        } else {
            return null
        }
    }

    componentDidMount(){
        const fetchCategories = this.props.fetchCategories();
        const fetchLocations = this.props.fetchLocations();
        Promise.all([fetchCategories, fetchLocations])
        .then( () => this.setState({loaded:true}))
        }

    handleStep(type){
        return () => {
            console.log(this.state.categorySelected)
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
                category_ids: catArray
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
        let loc = this.state.location[index]
        this.setState({
          selectedLocation: loc.name,
          selectedLocationId: loc.id
        })
    }

    handleClickPic(key){
        return e =>{
            e.preventDefault();
            this.setState({
                imageUrl: `defaultg${key+1}URL`
            })
        }
    }

    handleClick(categoryId){
        let temp = this.state.categories
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
                    <h3 className="create-group-card-title">First, where is your squad located?.</h3>
                    <p className="create-group-card-description">Squads meet locally and in person. We will recruit warriors from across your region.</p>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                    <div className="create-group-card-options">
                        <p className="create-group-card-selected">{this.state.selectedLocation}</p>
                        <CreateGroupFormDropdown location={this.state.selectedLocation} list={this.state.location} toggleLocation={this.toggleSelected} />
                    </div>
                </div>
            )
    
            let slide1 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">What best typifies your squad's fighting style</h3>
                    <p className="create-group-card-description">Be specific and don't be shy. We won't divulge the secret training methods of your squad.  We will help potential squad members find you!</p>
                    <p className="create-group-card-errors">{this.state.errorMessage}</p>
                    <div className="create-group-card-options">
                        <ul className="create-group-card-options-categories">
                            {this.state.categories.map( (category) => (
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
    
            let urls = ["defaultg1URL", "defaultg2URL", "defaultg3URL", "defaultg4URL", "defaultg5URL", "defaultg6URL"]
            let slide4 = (
                <div className="create-group-card-body">
                    <h3 className="create-group-card-title">Final step before forming your own squad.</h3>
                    <p className="create-group-card-description">Select an image to proudly represents the spirit of your squad.</p>
                    <div className="create-event-images">
                        {urls.map( (url, i) => {
                            return (<div onClick={this.handleClickPic(i)} key={i}>
                                <img  className={this.state.imageUrl===url ? "create-event-image-selected" : "create-event-image"} 
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

export default CreateGroupForm