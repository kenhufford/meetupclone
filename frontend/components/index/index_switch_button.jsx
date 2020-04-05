import React from 'react';
import { Link } from 'react-router-dom';

const IndexSwitchButton = props => {
    const { setSelected, buttonName, selected } = props;
    return(
        <div className={selected === buttonName ? "index-switch-selected" : "index-switch-not"}>
            <Link className={selected === buttonName ? "index-switch-text-selected" : "index-switch-text-not"}
                onClick={() => setSelected(buttonName)}
                to={`/index/${buttonName}`}>
                    {buttonName.toUpperCase()}
            </Link>
        </div>
    )
}

export default IndexSwitchButton;