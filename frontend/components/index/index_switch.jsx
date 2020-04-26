import React from 'react';
import IndexSwitchButton from './index_switch_button';

const IndexSwitch = props =>{
    const {setSelected, selected, buttons} = props;
    return(
        <div className="index-switch-div">
            {buttons.map( (button,i) => 
                <IndexSwitchButton
                    key={i}
                    buttonName={button.name}
                    buttonLink={button.link}
                    setSelected={setSelected}
                    selected={selected} />
            )}
        </div>
    )
}

export default IndexSwitch;