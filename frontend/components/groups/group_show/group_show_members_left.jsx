import React from 'react';

function GroupShowMembersLeft(){

    return (
        <div className="group-show-members-left">
            <div className="group-show-members-left-tab" onClick={this.switchPage("All members")}>
                <p className={this.state.currentPage === "All members" ? "group-show-members-selected" : "group-show-members-notselected"}>
                    All Members</p>
                <p className="group-show-members-length"> {this.props.memberships.length}</p>
            </div>
            <div className="group-show-members-left-tab" onClick={this.switchPage("Leadership team")}>
                <p className={this.state.currentPage !== "All members" ? "group-show-members-selected" : "group-show-members-notselected"}>
                    Leadership</p>
                <p className="group-show-members-length">{this.props.leaderIds.length}</p>
            </div>
        </div>
    )
}

export default GroupShowMembersLeft