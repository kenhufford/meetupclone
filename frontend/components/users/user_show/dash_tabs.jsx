import React from 'react';

const DashTabs = props => {
    let {tab, setTab} = props;
    return (
        <div className="user-show-right-top">
            <div className={tab === "Compare Brawlers" ? "dash-tab" : "dash-tab-not"}
                onClick={() => setTab("Compare Brawlers")}>
                <p>Compare Brawlers</p>
            </div>
            <div className={tab === "Compare Squads" ? "dash-tab" : "dash-tab-not"}
                onClick={() => setTab("Compare Squads")}>
                <p>Compare Squads</p>
            </div>
            <div className={tab === "View Rivalries" ? "dash-tab" : "dash-tab-not"}
                onClick={() => setTab("View Rivalries")}>
                <p>View Rivalries</p>
            </div>
        </div>
    )
}

export default DashTabs;