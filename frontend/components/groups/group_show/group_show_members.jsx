import React from 'react';
import GroupShowMembersLeft from './group_show_members_left';
import GroupShowMembersList from './group_show_members_list';

class GroupShowMembers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage: "All members",
            searchQuery: ''
        }
        this.update = this.update.bind(this);
        this.switchPage = this.switchPage.bind(this);
    }

    switchPage(page){
        return () => {
        this.setState({
            currentPage: page,
            searchQuery: ''
        })}
    }

    update(e){
        this.setState({searchQuery: e.currentTarget.value})
    }

    render(){
        let searchQuery = this.state.searchQuery;
        let {users, squadLeaderIds, captainIds, memberIds, memberships} = this.props;
        let leaderIds = squadLeaderIds.concat(captainIds);
        let {currentPage} = this.state;
        let ids = currentPage === "All members" ? memberIds : leaderIds;
        return (
            <div className="group-show-members">
                <GroupShowMembersLeft 
                    currentPage={currentPage}
                    switchPage={this.switchPage}
                    memberIds={memberIds}
                    leaderIds={leaderIds}
                    />
                <div className="group-show-members-right">
                    <div className="group-show-members-right-header">
                        <p>{this.state.currentPage}</p>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" 
                                className="group-show-filter-input"
                                placeholder="Search members"
                                value={this.state.searchQuery}
                                onChange={this.update}/>
                        </form>
                    </div>
                    <GroupShowMembersList
                        currentPage={currentPage}
                        users={users}
                        ids={ids}
                        searchQuery={searchQuery}
                        memberships={memberships}
                        />
                </div>
            </div>

        )
    }
}

export default GroupShowMembers;