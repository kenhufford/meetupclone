import React from 'react';
import IndexSwitchButton from './index_switch_button';

function IndexSwitch(props){
    let {setSelected,selected} = props;

    return(
        <div className="index-switch-div">
            <IndexSwitchButton
                buttonName="squads"
                setSelected={setSelected}
                selected={selected}/>
            <IndexSwitchButton
                buttonName="brawls"
                setSelected={setSelected}
                selected={selected} />
            <IndexSwitchButton
                buttonName="styles"
                setSelected={setSelected}
                selected={selected} />
        </div>
    )
}

export default IndexSwitch;