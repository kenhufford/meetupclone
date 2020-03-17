import React from 'react';

function GroupShowAboutLeft(props){
    let {description} = props;
    return(
        <div className="group-show-main-left">
            <p className="group-show-stripe-left-header">
                What We're About
                </p>
            <p className="group-show-stripe-left-description">
                {description}
            </p>
        </div>
    )
}


export default GroupShowAboutLeft;