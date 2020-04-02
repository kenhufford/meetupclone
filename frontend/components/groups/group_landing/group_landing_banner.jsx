import React from 'react';
import SearchBar from '../../searchbar/search_bar';

function GroupLandingBanner(){
    return(
        <div className="landing-banner">
            <div className="landing-banner-left">
                <h1 className="landing-banner-left-title">
                    Join the ultimate brawl
                        </h1>
                <h3 className="landing-banner-left-subtitle">
                    Find your spirit squad and enter the fray
                        </h3>
                <SearchBar
                    history={history}
                    autoSearch={false} />
            </div>
            <div className="landing-banner-right">
                <img className="landing-banner-right-image"
                    src={window.mainImageURL} />
            </div>
        </div>
    )
}

export default GroupLandingBanner;