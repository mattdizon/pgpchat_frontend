import React from 'react'
import ConversationsList from './ConversationsList';
import UserSearchForm from './UserSearchForm'


class AllChats extends React.Component{

    state = {
        showUserSearchForm: false
    }

    showUserSearchForm = () =>{
        this.setState({showUserSearchForm: !this.state.showUserSearchForm})
    }
    render(){
        return(
            <div className = "leftChat">
                <div className = "messageHeader">
                    <h1>Messages</h1>
                    <div class="row">
                        <div className="col-md-6">

                                <button className = "addFriend" onClick = {this.showUserSearchForm}> Add Friend </button>
                                {this.state.showUserSearchForm && <UserSearchForm/>}
                        </div>
	                </div>
                </div>

            </div>
        )
    }
}
export default AllChats
