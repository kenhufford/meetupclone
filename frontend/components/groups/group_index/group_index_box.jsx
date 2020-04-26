import React from 'react';
import GroupIndexList from './group_index_list';
import EventIndexList from '../../events/event_index/event_index_list_short';

const IndexBox = (props)  => {
    let { type,items, title, switchPage, currentPage,max,dropdown,limit, setLimit} = props;
    return (
        <div className="landing-main-groups">
            <div className="landing-main-groups-header">
                <p className="index-box-div-titles">
                    {title}
                </p>
                {dropdown}
                <div>
                    <div className="index-switch-div">
                        <i className={currentPage !== 1 ? "fas fa-angle-double-left index-switch-caret" : "fas fa-angle-double-left index-switch-caret-not"}
                            onClick={() => switchPage("allBack", type)}></i>
                        <i className={currentPage !== 1 ? "fas fa-angle-left index-switch-caret" : "fas fa-angle-left index-switch-caret-not"}
                            onClick={() => switchPage("back", type)}></i>
                        <p className="index-switch-caret">
                            {`${currentPage} of ${max}`}
                        </p>
                        <i className={(currentPage === max || max===0) ? "fas fa-angle-right index-switch-caret-not" : "fas fa-angle-right index-switch-caret"}
                            onClick={() => switchPage("forward", type)}></i>
                        <i className={(currentPage === max || max === 0)? "fas fa-angle-double-right index-switch-caret-not" : "fas fa-angle-double-right index-switch-caret"}
                            onClick={() => switchPage("allForward", type)}></i>
                    </div>
                    <div className="index-switch-div">
                        <p className={limit === 3 ? "index-switch-caret" : "index-switch-caret-not"}
                            onClick={() => setLimit(3, type)}>
                            3
                        </p>
                        <p>|</p>
                        <p className={limit === 6 ? "index-switch-caret" : "index-switch-caret-not"}
                            onClick={() => setLimit(6,type)}>
                            6
                        </p>
                        <p>|</p>
                        <p className="index-switch-caret" className={limit === 9 ? "index-switch-caret" : "index-switch-caret-not"}
                            onClick={() => setLimit(9,type)}>
                            9
                        </p>
                    </div>
                </div>
            </div>
            {["groups", "allGroups", "userGroups"].includes(type) ? 
                <GroupIndexList groups={items}/> : 
                <EventIndexList events={items}/>
                }
            
        </div>
    )
}

export default IndexBox;