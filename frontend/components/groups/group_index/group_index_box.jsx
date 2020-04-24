import React from 'react';
import GroupIndexList from './group_index_list';

const GroupIndexBox = (props)  => {
    let { groups, title, switchPage} = props;
    return (
        <div className="landing-main-groups">
            <div className="landing-main-groups-header">
                <p className="index-div-titles">
                    {title}
                </p>
                <div className="index-switch-div">
                    <div className="index-switch-selected">
                        <button className="index-switch-text-selected"
                            onClick={() => switchPage("back", title)}>
                            BACK
                        </button>
                    </div>
                    <div className="index-switch-selected">
                        <button className="index-switch-text-selected"
                            onClick={() => switchPage("forward", title)}>
                            FORWARD
                        </button>
                    </div>
                </div>

            </div>
            <GroupIndexList
                groups={groups} />
        </div>
    )
}

export default GroupIndexBox;