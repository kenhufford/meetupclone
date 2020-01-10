import React from 'react';
import GroupIndexContainer from './group_index_container'
class GroupLanding extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchGroups();
    }


    render(){
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
                    {/* <GroupIndexContainer /> */}
                </div>
            </div>
        )
    }
}

export default GroupLanding