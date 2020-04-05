import React from 'react';
import CreateGroupFormDropdown from '../create_group_form_dropdown';

const GroupLandingIndex = props => {
    const {selectedLocation, selectLocation, locations, indexList, indexName} = props;
    return(
        <div className="landing-main-groups">
            <div className="landing-location-dropdown">
                <div className="landing-location-h4">
                    {indexName} in {selectedLocation}
                </div>
                <CreateGroupFormDropdown
                    list={locations}
                    toggleLocation={selectLocation} />
            </div>
            {indexList}
        </div>
    )
}

export default GroupLandingIndex;