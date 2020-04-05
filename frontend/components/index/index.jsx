import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import EventIndexContainer from '../events/event_index/event_index_container';
import CategoryIndexContainer from '../categories/category_index_container';
import { withRouter } from 'react-router-dom';
import GroupIndexContainer from '../groups/group_index/group_index_container';
import IndexSwitch from './index_switch';
function Index(props){
    let [selected, setSelected] = useState("squads");
    useEffect( () => {
        if (props.history.location.pathname.split("/")[2] !==  selected) {
            setSelected(props.history.location.pathname.split("/")[2])
        }
    })

    return (
        <div className="index-div">
            <div className="index-header">
                <div className="index-div-titles">
                    FIND YOUR FIGHT TONIGHT
                </div>
               <IndexSwitch 
                setSelected={setSelected}
                selected={selected}
                />
            </div>
            <Switch>
                <Route exact path="/index/squads" component={GroupIndexContainer} />
                <Route exact path="/index/brawls" component={EventIndexContainer} />
                <Route exact path="/index/styles" component={CategoryIndexContainer} />
            </Switch>
        </div>
    )
}

export default withRouter(Index);