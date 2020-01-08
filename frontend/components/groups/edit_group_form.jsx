


import React from 'react';
import CreateGroupFormDropdown from './create_group_form_dropdown'

class EditGroupForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            group: this.props.group,
            location: "",
            errorMessage: "",
            imageUrl: "",
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
        this.toggleSelected = this.toggleSelected.bind(this);
    }

    update(key){
        return e => this.setState({[key]: e.currentTarget.value})
    }

    handleClick(categoryId){
        let temp = this.state.categories
        temp[categoryId].selected = !temp[categoryId].selected 
        this.setState({
            categories: temp
          })
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
            "San Diego": {
                lat: 32.7157,
                long: 117.1611
            },
        }
        this.setState({
          [key]: temp,
          selectedLocation: temp[id].location,
          lat: locationCoords[temp[id].location].lat,
          long: locationCoords[temp[id].location].long
        })
    }

    componentDidMount(){
        this.props.fetchGroup(this.props.match.params.groupId)
    }

    render(){
        let {name, description} = this.state.group
        if (this.props.group){
            return(
                <div className="edit-group">
                    <form className="edit-group-form">
                        <label>
                            Group Name
                            <input type="text" value={name}/>
                        </label>
                        <label>
                            Description
                            <input type="text" value={description}/>
                        </label>
                        <label>
                            Location
                            <CreateGroupFormDropdown location={this.state.selectedLocation} list={this.state.location} toggleItem={this.toggleSelected} />
                        </label>
                        <label>
                            Categories
                            <CreateGroupFormDropdown location={this.state.selectedLocation} list={this.state.location} toggleItem={this.toggleSelected} />
                        </label>
                    </form>
                </div>
            )
        }
    }
}

export default EditGroupForm;