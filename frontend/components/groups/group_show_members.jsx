import React from 'react';
import {formatDate} from '../../utils/date_util'

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
        let icons = {"Initiate": "initiateURL","Squad Leader": "squadleaderURL","Captain": "captainURL"}
        let {memberships, users, leaderIds} = this.props
        let list = this.state.currentPage==="All members" ? 
        (<ul className="group-show-members-right-list">
            {memberships.map ((membership, i) => {
                let { imageUrl, name, createdAt } = users[membership.userId]
                if (searchQuery === '' || name.toLowerCase().includes(searchQuery.toLowerCase())){
                    return (
                        <li key={i} className="group-show-members-right-member-li">
                            <div className="group-show-members-right-member">
                                <img src={window[imageUrl]} className="group-show-members-right-member-img" />
                                <div className="group-show-members-right-member-info">
                                    <div className="group-show-members-right-member-info-left">
                                        <section>{name}</section>
                                        <p>Joined on {formatDate(createdAt)}</p>
                                    </div>
                                    <div className="group-show-members-right-member-info-right">
                                        <p>{membership.memberType}</p>
                                        <img className="group-show-member-picture-square" src={window[icons[membership.memberType]]} alt="" />
                                    </div>
                                </div>
                            </div>

                        </li>
                    )
                }  
            })}
        </ul>) : 

        (<ul className="group-show-members-right-list">
            {leaderIds.map ((id, i) => {
                let {imageUrl, name, createdAt} = users[id]
                if (searchQuery === '' || name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return (
                    <li key={i} className="group-show-members-right-member-li">
                        <div className="group-show-members-right-member">
                            <img src={window[imageUrl]} className="group-show-members-right-member-img"/>
                            <div  className="group-show-members-right-member-info">
                                <p>{name}</p>
                                <p>Joined on {formatDate(createdAt)}</p>
                            </div>
                        </div>

                    </li>
                )}
            })}
            
        </ul>)

        return (
            
            <div className="group-show-members">
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

                    {list}
                </div>
            </div>

        )
    }
}

export default GroupShowMembers;