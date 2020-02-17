import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import EventIndexContainer from './events/event_index_container';
import CategoryIndexContainer from './categories/category_index_container';
import { withRouter } from 'react-router-dom';
import GroupIndexContainer from './groups/group_index_container';
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selected: this.props.history.location.pathname.split("/")[2]
        }
    }

    pickIndex(type){
        this.setState({
            selected: type
        })
    }

    componentDidUpdate(prevProps){ 
        if (prevProps.history.location.pathname.split("/")[2] !== prevProps.location.pathname.split("/")[2]){
            this.setState({
                selected: this.props.history.location.pathname.split("/")[2]
            })
        }

    }

    render(){
        return (
            <div className="index-div">
                <div className="index-header">
                    <div className="index-div-titles">
                        FIND YOUR FIGHT TONIGHT
                    </div>
                    <div className="index-switch-div">
                        {this.state.selected === "squads" ? 
                        (<div className="index-switch-selected">
                            <Link className="index-switch-text-selected" 
                                onClick={() => this.pickIndex("squads")}
                                to="/index/squads">SQUADS</Link>
                        </div> ): 
                        (<div className="index-switch-not">
                            <Link className="index-switch-text-not" 
                                onClick={() => this.pickIndex("squads")}
                                    to="/index/squads">SQUADS</Link>
                        </div>)}

                        {this.state.selected === "brawls" ?
                            (<div className="index-switch-selected">
                                <Link className="index-switch-text-selected" 
                                    onClick={() => this.pickIndex("brawls")}
                                    to="/index/brawls">BRAWLS</Link>
                            </div>) :
                            (<div className="index-switch-not">
                                <Link className="index-switch-text-not" 
                                    onClick={() => this.pickIndex("brawls")}
                                    to="/index/brawls">BRAWLS</Link>
                            </div>)}

                        {this.state.selected === "styles" ?
                            (<div className="index-switch-selected">
                                <Link className="index-switch-text-selected" 
                                    onClick={() => this.pickIndex("styles")}
                                    to="/index/styles">STYLES</Link>
                            </div>) :
                            (<div className="index-switch-not">
                                <Link className="index-switch-text-not" 
                                    onClick={() => this.pickIndex("styles")}
                                    to="/index/styles">STYLES</Link>
                            </div>)}
                    </div>
                </div>
                <Switch>
                    <Route exact path="/index/squads" component={GroupIndexContainer} />
                    <Route exact path="/index/brawls" component={EventIndexContainer} />
                    <Route exact path="/index/styles" component={CategoryIndexContainer} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(Index);