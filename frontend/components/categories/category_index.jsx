import React from 'react';
import CategoryIndexItem from './category_index_item'
import {Link} from 'react-router-dom'

class EventIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }
    this.componentDidMount = this.componentDidMount.bind(this)
}

    componentDidMount(){
        const fetchCategories = this.props.fetchCategories()
        Promise.all([fetchCategories])
            .then( () => this.setState({loaded:true}))
    }

    render(){
        if(this.state.loaded){
            let {categories} = this.props
            let allFightingStyles = (
                <div className="groups-div">
                    {Object.values(categories).map( (category) => (
                        <CategoryIndexItem key={category.id} category={category}/>
                    ))}
                </div>
            )
            
            return (
                    <div className="index-div">
                        <div className="index-header">
                            <p className="index-div-titles">ALL FIGHTING STYLES</p>
                            <div className="index-switch-div">
                                <div className="index-switch-not">
                                    <Link className="index-switch-text-not" to="/groups">SQUADS</Link>
                                </div>
                                <div className="index-switch-not">
                                    <Link className="index-switch-text-not" to="/events">BRAWLS</Link>
                                </div>                    
                                <div className="index-switch-selected">
                                    <Link className="index-switch-text-selected" to="/categories">STYLES</Link>
                                </div>                    
                            </div>
                        </div>
                        {allFightingStyles}
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