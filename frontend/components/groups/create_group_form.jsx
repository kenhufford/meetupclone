import React from 'react';
import CreateGroupFormDropdown from './create_group_form_dropdown'

class CreateGroupForm extends React.Component{
    constructor(props){
        super(props)
        let {name, description, lat, long, imageUrl, selectedLocationId, selectedLocation} = this.props.group

        this.state = {
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
            categories: this.props.categories
        }
        this.handleStep = this.handleStep.bind(this);
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
        this.props.fetchCategories()
        this.props.fetchLocations()

        }

    handleStep(type){
        console.log(this.state)
        return () => {
        let slide = this.state.currentSlide;
        let groupId = this.props.match.params.groupId;
        let catArray = [];
        if (slide === 4 && this.state.description.length >= 50 && type==="next") {
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
        } else if (slide === 2 && this.state.name.length <= 8 && type==="next"){
            this.setState({
                errorMessage: "Please enter more than 8 characters"
            })
        } else if (slide === 3 && this.state.description.length <= 50 && type==="next"){
            this.setState({
                errorMessage: "Please enter more than 50 characters"
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

    handleClick(categoryId){
        let temp = this.state.categories
        temp[categoryId-1].selected = !temp[categoryId-1].selected 
        this.setState({
            categories: temp
          })
    }

    render(){
  
        if (!this.state.location[0] || !this.state.categories[0]) return null
        let slide0 = (
            <div className="create-group-card-body">
                <h3 className="create-group-card-title">First, where is your squad located?.</h3>
                <p className="create-group-card-description">Beatup squads meet locally and in person. We’ll connect you with people who live in and around your area.</p>
                <p className="create-group-card-errors">{this.state.errorMessage}</p>
                <div className="create-group-card-options">
                    <p className="create-group-card-selected">{this.state.selectedLocation}</p>
                    <CreateGroupFormDropdown location={this.state.selectedLocation} list={this.state.location} toggleLocation={this.toggleSelected} />
                </div>
            </div>
        )

        let slide1 = (
            <div className="create-group-card-body">
                <h3 className="create-group-card-title">Choose a few topics that describe your squad's style</h3>
                <p className="create-group-card-description">Be specific and don't be shy. We won't divulge the secret training methods of your squad.  We will help potential squad members find you!</p>
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
                    <input className="create-group-card-name-field" type="text" value={this.state.name}  placeholder={this.state.selectedLocation + "'s Big Beatdown Bullies"} onChange={this.update('name')}/>
                </div>
            </div>
        )

        let slide3 = (
            <div className="create-group-card-body">
                <h3 className="create-group-card-title">Now describe what your squad is about.  Tenets.  Core Principles.  Average Wedensday mornings.</h3>
                <p className="create-group-card-description">People will see this when we promote your squad, but you’ll be able to add to it later, too.</p>
                <ol className="create-group-card-ol">
                    <li>What's the purpose of the squad?</li>
                    <li>Who should join?</li>
                    <li>What will you do at your events?</li>
                </ol>
                <p className="create-group-card-errors">{this.state.errorMessage}</p>
                <div className="create-group-card-options">
                    <textarea className="create-group-card-name-field-big" type="text" value={this.state.description} placeholder="Please enter at least 50 characters" onChange={this.update('description')}/>
                </div>
            </div>
        )

        let slide4 = (
            <div className="create-group-card-body">
                <h3 className="create-group-card-title">Almost done! Just take a minute to review our guidelines</h3>
                <p className="create-group-card-description">Beatup is all about helping people live fuller, happier lives—with the help of strong communities that like to let out phyiscal energy at Squad-sanctioned brawls. This means that all squads should:</p>
                <ul className="create-group-card-ul">
                    <li>Provide mental/physical gains and EXP for members</li>
                    <li>Encourage real human interactions</li>
                    <li>Meet in real life</li>
                    <li>Have a leader present at all events</li>
                    <li>Fight with honor at any brawl event</li>
                    <li>Fight with honor for glory at any brawl event</li>
                </ul>
                <p className="create-group-card-description">Once you submit your squad, Beatup will review it based on these guidelines and make sure it gets promoted to the right people.  </p>
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
    }
}

export default CreateGroupForm