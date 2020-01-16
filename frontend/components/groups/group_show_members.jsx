import React from 'react';
import {formatDate} from '../../utils/date_util'

class GroupShowMembers extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage: "All members"
        }
        this.switchPage = this.switchPage.bind(this);
    }

    switchPage(page){
        return () => {
        this.setState({
            currentPage: page
        })}
    }

    render(){
        let {memberships, users, captainIds} = this.props
        console.log(users)
        let list = this.state.currentPage==="All members" ? 
        (<ul className="group-show-members-right-list">
            {memberships.map ((membership, i) => {
                let {imageUrl, name, createdAt} = users[membership.userId]
                return (
                    <li key={i} className="group-show-members-right-member-li">
                        <div className="group-show-members-right-member">
                            <img src={window[imageUrl]} className="group-show-members-right-member-img"/>
                            <div className="group-show-members-right-member-info">
                                <p>{name}</p>
                                <p>Joined on {formatDate(createdAt)}</p>
                            </div>
                        </div>

                    </li>
                )
            })}
        </ul>) : 

        (<ul className="group-show-members-right-list">
            {captainIds.map ((id, i) => {
                let {imageUrl, name, createdAt} = users[id]
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
                )
            })}
        </ul>)

        return (
            
            <div className="group-show-members">
                <div className="group-show-members-left">
                    <div className="group-show-members-left-tab" onClick={this.switchPage("All members")}>
                        <p>All Members</p>
                        <p> {this.props.memberships.length}</p>
                    </div>
                    <div className="group-show-members-left-tab" onClick={this.switchPage("Leadership team")}>
                        <p>Leadership</p>
                        <p> {this.props.captainIds.length}</p>
                    </div>
                </div>
                <div className="group-show-members-right">
                    <div className="group-show-members-right-header">
                        <p>{this.state.currentPage}</p>
                    </div>

                    {list}
                </div>
            </div>

        )
    }
}

export default GroupShowMembers;