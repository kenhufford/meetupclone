// import React from "react"

// class GroupShowJoin extends React.Component{
//     constructor(props){
//         super(props)
//         this.state = ({
//             currentMember: this.props.currentMember
//         })
//         this.handleJoin = this.handleJoin.bind(this);
//         this.handleRemove = this.handleRemove.bind(this);
//     }

//     handleJoin(){
//         if (!this.props.session.id){
//             document.location.href = '#/login'
//         } else {
//             this.setState({
//                 currentMember: true
//             })
//             let membership = 
//                 {group_id: this.props.groupId,
//                 user_id: this.props.session.id,
//                 member_type: "Member"}
//             this.props.createMembership(membership)
//         }

//     }

//     handleRemove(){
//         if (!this.props.session.id){
//             document.location.href = '#/login'
//         } else {
//             this.setState({
//                 currentMember: false
//             })
//             let membership = 
//                 {group_id: this.props.groupId,
//                 user_id: this.props.session.id}
//             this.props.deleteMembership(membership)
//         }
//     }

//     render(){
//         let join = (!this.state.currentMember && this.state) ? 
//             (<button className="group-show-join-button" onClick={this.handleJoin}>Join this Group</button>)
//             : 
//             (<button className="group-show-join-button" onClick={this.handleRemove}>Remove from Group</button>)
//         return(
//             <div>
//                 {join}
//             </div>
//         )
//     }
// }

// export default GroupShowJoin