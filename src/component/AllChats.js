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
                            {this.state.showUserSearchForm && <UserSearchForm userObj = {this.props.userObj}/>}
                            <table className = "leftMenu">
                            <tr>
                                <li  onClick = {(e) => this.props.showMiddle(e)} value = "0">Home</li>
                                </tr>
                                <tr>
                                <li  onClick = {(e) => this.props.showMiddle(e)} value = "1">Friends</li>
                                </tr>
                                <tr>
                                <li  onClick = {(e) => this.props.showMiddle(e)} value = "2">Sent Messages</li>
                                </tr>
                                <tr>
                                <li  onClick = {(e) => this.props.showMiddle(e)} value = "3">Recieved Messages</li>
                                </tr>
                                <tr>
                                    <li  onClick = {(e) => this.props.showMiddle(e)} value = "4"> Decrypt Message</li>
                                </tr>
                                <tr>
                                    <li  onClick = {this.showUserSearchForm}> Add Friend </li>
                                </tr>
                            </table>
                        </div>
	                </div>
                </div>
            </div>
        )
    }
}
export default AllChats
