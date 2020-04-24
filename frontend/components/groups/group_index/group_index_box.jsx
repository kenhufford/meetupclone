import React from 'react';
import GroupIndexList from './group_index_list';

const GroupIndexBox = (props)  => {
    let { groups, title, switchPage, currentPage,max} = props;
    return (
        <div className="landing-main-groups">
            <div className="landing-main-groups-header">
                <p className="index-div-titles">
                    {title}
                </p>
                <div className="index-switch-div">
                    <i className="fas fa-angle-double-left index-switch-caret"
                        onClick={() => switchPage("allBack", title)}></i>
                    <i className="fas fa-angle-left index-switch-caret"
                        onClick={() => switchPage("back", title)}></i>
                    <p className="index-switch-caret">
                        {`${currentPage} of ${max}`}
                    </p>
                    <i className="fas fa-angle-right index-switch-caret"
                        onClick={() => switchPage("forward", title)}></i>
                    <i className="fas fa-angle-double-right index-switch-caret"
                        onClick={() => switchPage("allForward", title)}></i>
                </div>

            </div>
            <GroupIndexList
                groups={groups} />
        </div>
    )
}

export default GroupIndexBox;