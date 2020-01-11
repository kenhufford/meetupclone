import React from 'react';
import GroupIndexItem from './group_index_item'

class GroupLanding extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchGroups();
    }


    render(){
        if (!this.props.groups[0]) return null
        let nearbyGroups = []
        this.props.groups.map(group => {
            if (group.locationId === 1) nearbyGroups.push(group)
        })
        return(
            <div className="group-landing">
                <div className="group-landing-banner">
                    <div className="group-landing-banner-left">
                        <h1 className="group-landing-banner-left-title">The real world is calling</h1>
                        <h3 className="group-landing-banner-left-subtitle">Attend local events to meet people, try something new, or do more of what you love.</h3>
                        <div className="group-landing-banner-left-search">
                            <div className="group-landing-banner-left-search-bar-container">
                            <input type="text" className="group-landing-banner-left-search-bar"/>
                            </div>
                            
                            <button className="group-landing-banner-left-search-button">Search</button>
                        </div>
                    </div>
                    <div className="group-landing-banner-right">
                        <img className="group-landing-banner-right-image" src={window.mainImageURL}/>
                    </div>
                </div>
                <div className="group-landing-groups">
                    <h4>Groups near San Francisco, CA</h4>
                    <div className="groups-div">
                        {nearbyGroups.map(group => (
                            <GroupIndexItem key={group.id} group={group}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupLanding