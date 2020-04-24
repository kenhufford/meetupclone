import React from 'react';
import GroupIndexList from './group_index_list';


const GroupIndexBox = (props)  => {
    let { groups, title, switchPage, currentPage,max,dropdown,limit, setLimit} = props;
    return (
        <div className="landing-main-groups">
            <div className="landing-main-groups-header">
                <p className="index-box-div-titles">
                    {title}
                </p>
                {dropdown}
                <div>
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
                    <div className="index-switch-div">
                        <p 
                            className={limit === 3 ? "index-switch-caret" : "index-switch-caret-not"}
                            onClick={() => setLimit(3)}>
                            3
                        </p>
                        <p>|</p>
                        <p className={limit === 6 ? "index-switch-caret" : "index-switch-caret-not"}
                            onClick={() => setLimit(6)}>
                            6
                        </p>
                        <p>|</p>
                        <p className="index-switch-caret" className={limit === 9 ? "index-switch-caret" : "index-switch-caret-not"}
                            onClick={() => setLimit(9)}>
                            9
                        </p>
                    </div>
                </div>
            </div>
            <GroupIndexList
                groups={groups} />
        </div>
    )
}

export default GroupIndexBox;