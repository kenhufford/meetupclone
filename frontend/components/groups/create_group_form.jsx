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
            errorMessage: "",
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
        let slide = this.state.currentSlide;
        if (slide === 4 && this.state.description.length >= 50 && type==="next") {
            this.props.createGroup({
                name: this.state.name,
                description: this.state.description,
                lat: this.state.lat,
                long: this.state.long,
                imageUrl: '',
            }).then( (payload) => {
                this.props.history.push(`/groups/${payload.group.id}`)
                console.log(payload)
                this.props.createMembership(payload.group.id)
                    .then( (payload2) => {
                        console.log(payload2)
                        this.props.updateMembership({
                            member_type: "Organizer",
                            groupId: payload2.group.id,
                            id: payload2.group.memberships[0].id
                        })
                    })
                }
            )
        } else if (slide === 0 && this.state.selectedLocation === "Select Location" && type==="next"){
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
            console.log("im moving slides")
            slide = (type === "prev") ? slide-1 : slide+1
            if (slide < 0){
                slide = 0
            }
            this.setState({
                currentSlide: slide,
                errorMessage: ""
            })}
        }
    }

    update(key){
        return e => this.setState({[key]: e.currentTarget.value})
    }

    toggleSelected(id, key){
        let temp = this.state[key]
        let locationCoords = {
            "San Francisco": {
                lat: 37.7749,
                long: 122.4194
            }, 
            "Oakland":{
                lat: 37.8044,
                long: 122.2712
            },
            "San Jose": {
                lat: 37.3382,
                long: 121.8863
            },
            "Los Angeles": {
                lat: 34.0522,
                long: 118.2437
            },
            "Orange County": {
                lat: 33.7175,
                long: 117.8311
            },
        }
        this.setState({
          [key]: temp,
          selectedLocation: temp[id].location,
          lat: locationCoords[temp[id].location].lat,
          long: locationCoords[temp[id].location].long
        })
        console.log(this.state)
    }

    handleClick(categoryId){
        let temp = this.state.categories
        temp[categoryId].selected = !temp[categoryId].selected 
        this.setState({
            categories: temp
          })
    }

    render(){
        let slide0 = (
            <div className="create-group-card-body">
                <h3 className="create-group-card-title">First, set your group’s location.</h3>
                <p className="create-group-card-description">Meetup groups meet locally and in person. We’ll connect you with people who live in and around your area.</p>
                <p className="create-group-card-errors">{this.state.errorMessage}</p>
                <div className="create-group-card-options">
                    <p className="create-group-card-selected">{this.state.selectedLocation}</p>
                    <CreateGroupFormDropdown location={this.state.selectedLocation} list={this.state.location} toggleItem={this.toggleSelected} />
                </div>
            </div>
        )

        let slide1 = (
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

        let slide2 = (
            <div className="create-group-card-body">
                <h3 className="create-group-card-title">What will your group’s name be?</h3>
                <p className="create-group-card-description">Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
                <p className="create-group-card-errors">{this.state.errorMessage}</p>
                <div className="create-group-card-options">
                    <input className="create-group-card-name-field" type="text" value={this.state.name}  placeholder={this.state.selectedLocation + "'s Big Beatdown Bullies"} onChange={this.update('name')}/>
                </div>
            </div>
        )

        let slide3 = (
            <div className="create-group-card-body">
                <h3 className="create-group-card-title">Now describe what your group will be about</h3>
                <p className="create-group-card-description">People will see this when we promote your group, but you’ll be able to add to it later, too.</p>
                <ol className="create-group-card-ol">
                    <li>What's the purpose of the group?</li>
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
                <p className="create-group-card-description">Meetup is all about helping people live fuller, happier lives—with the help of strong communities. This means that all groups should:</p>
                <ul className="create-group-card-ul">
                    <li>Provide growth opportunities for members</li>
                    <li>Encourage real human interactions</li>
                    <li>Meet in real life</li>
                    <li>Have a host present at all events</li>
                    <li>Be transparent about the group’s intentions</li>
                </ul>
                <p className="create-group-card-description">Once you submit your group, a human at Meetup will review it based on these guidelines and make sure it gets promoted to the right people.</p>
            </div>
        )

        let slides = [slide0, slide1, slide2, slide3, slide4]

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