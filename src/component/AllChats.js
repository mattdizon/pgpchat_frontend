import React from 'react'
import UserSearchForm from './UserSearchForm'


class AllChats extends React.Component{

    state = {
        showUserSearchForm: false,
    }

    showUserSearchForm = () =>{
        this.setState({showUserSearchForm: !this.state.showUserSearchForm})
    }
    render(){
        return(
            <div className = "leftChat">
                <div className = "messageHeader">
                    <div className="row">
                        <div className="col-md-6">
                            <button className = "addFriend" onClick = {this.showUserSearchForm}> Add Friend </button>
                            {this.state.showUserSearchForm && <UserSearchForm userObj = {this.props.userObj}/>}
                            <ul className = "leftMenu">
                                <li  onClick = {(e) => this.props.showMiddle(e)} value = "0">Home</li>
                                <li  onClick = {(e) => this.props.showMiddle(e)} value = "1">Friends</li>
                                <li  onClick = {(e) => this.props.showMiddle(e)} value = "2">Messages</li>
                            </ul>
                        </div>
	                </div>
                </div>
            </div>
        )
    }
}
export default AllChats
