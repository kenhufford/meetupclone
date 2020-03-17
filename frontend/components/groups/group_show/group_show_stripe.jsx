import React from 'react';
class GroupShowStripe extends React.Component{
    render(){
        let {currentPage, switchPage, groupDropdown} = this.props;
        return (
            <div className="group-show-stripe">
                <div className="group-show-stripe-left">
                    <li className={currentPage === "about" ? "group-show-inline-list-item-selected" : "group-show-inline-list-item"}
                        onClick={switchPage('about')}>
                        About
                    </li>
                    <li className={currentPage === "events" ? "group-show-inline-list-item-selected" : "group-show-inline-list-item"}
                        onClick={switchPage('events')}>
                        Brawls
                    </li>
                    <li className={currentPage === "members" ? "group-show-inline-list-item-selected" : "group-show-inline-list-item"}
                        onClick={switchPage('members')}>
                        Members
                    </li>
                    {groupDropdown}
                </div>
            </div>
        )
    }
}

export default GroupShowStripe;