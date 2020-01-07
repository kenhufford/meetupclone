import React from 'react';
import CreateGroupFormDropdown from './create_group_form_dropdown'

class CreateGroupForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            description: '',
            lat: '',
            long: '',
            imageUrl: '',
            currentSlide: 0,
            selectedLocation: "Select Location",
            location: [
                {
                    id: 0,
                    location: 'San Francisco',
                    selected: false,
                    key: 'location'
                },
                {
                  id: 1,
                  location: 'Oakland',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 2,
                  location: 'San Jose',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 3,
                  location: 'Orange County',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 4,
                  location: 'Los Angeles',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 5,
                  location: 'San Diego',
                  selected: false,
                  key: 'location'
                }
              ],
            categories: [
                {
                    id: 0,
                    name: 'Krav maga',
                    selected: false,
                    key: 'categories'
                },
                {
                  id: 1,
                  name: 'Abunch of spinning stuff',
                  selected: false,
                  key: 'categories'
                },
                {
                  id: 2,
                  name: 'Drunken master',
                  selected: false,
                  key: 'categories'
                },
                {
                  id: 3,
                  name: 'Only eye gouging',
                  selected: false,
                  key: 'categories'
                },
                {
                  id: 4,
                  name: 'Pillow fighting',
                  selected: false,
                  key: 'categories'
                },
                {
                  id: 5,
                  name: 'WWE Style Wraslin',
                  selected: false,
                  key: 'categories'
                },
                {
                    id: 6,
                    name: 'Bare knuckles boxing',
                    selected: false,
                    key: 'categories'
                },
                {
                    id: 7,
                    name: 'Anchorman brawl',
                    selected: false,
                    key: 'categories'
                },
              ]
        }
        this.handleStep = this.handleStep.bind(this);
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    handleStep(type){
        return () => {
        let slide = (type === "prev") ? this.state.currentSlide-1 : this.state.currentSlide+1
        if (slide < 0){
            slide = 0
        } else if (slide > 1) {
            slide = 1
        }
        this.setState({
            currentSlide: slide
        })}
    }

    toggleSelected(id, key){
        let temp = this.state[key]
        this.setState({
          [key]: temp,
          selectedLocation: temp[id].location
        })
    }

    handleClick(categoryId){
        let temp = this.state.categories
        temp[categoryId].selected = !temp[categoryId].selected 
        this.setState({
            categories: temp
          })
    }

    render(){
        let slide1 = (
            <div className="create-group-card-body">
                <h3 className="create-group-card-title">First, set your group’s location.</h3>
                <p className="create-group-card-description">Meetup groups meet locally and in person. We’ll connect you with people who live in and around your area.</p>
                <div className="create-group-card-options">
                    <p className="create-group-card-selected">{this.state.selectedLocation}</p>
                    <CreateGroupFormDropdown location={this.state.selectedLocation} list={this.state.location} toggleItem={this.toggleSelected} />
                </div>
            </div>
        )

        let slide2 = (
            <div className="create-group-card-body">
                <h3 className="create-group-card-title">Choose a few topics that describe your group's interests</h3>
                <p className="create-group-card-description">Be specific! This will help us promote your group to the right people. You can choose up to 15 topics.</p>
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

        let slides = [slide1, slide2]

        return(
            <div>
                <div className="create-group-div">
                    {slides[this.state.currentSlide]}
                </div>
                <div className="create-group-footer">
                    <div>
                        <button onClick={this.handleStep('prev')} className="create-group-footer-prev">Prev</button>
                    </div>
                    <div>
                        <button onClick={this.handleStep('next')} className="create-group-footer-next">Next</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default CreateGroupForm