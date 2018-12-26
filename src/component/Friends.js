import React from 'react'
import FriendElement from './FriendElement'
import MessageForm from './MessageForm'

class Friends extends React.Component{
    state = {
        friendsList: [],
        shouldShowMessageToFriendForm: false,
        messageFriend: {}
    }
    renderFriend = () =>{
        return this.props.friendsList.map(friend => <FriendElement friend = {friend} shouldShowMessageToFriendForm = {this.shouldShowMessageToFriendForm}/>)
    }
    shouldShowMessageToFriendForm = (e) =>{
        this.setState({shouldShowMessageToFriendForm: !this.state.shouldShowMessageToFriendForm,
                        messageFriend: e})
                        console.log(this.state.messageFriend)
    }
    renderShowMessagetoFriendForm = () =>{
        return (
            <div>
                <MessageForm friendObj = {this.state.messageFriend}/>
            </div>
        )
    }



    render() {
        return (
            <div className = "middleDiv">
                <h1 onClick = {this.props.test}>Friends List</h1>
                <table>
                    <tbody>
                            {this.renderFriend()}
                    </tbody>
                </table>
                <div className = "messageForm">
                {this.state.shouldShowMessageToFriendForm && this.renderShowMessagetoFriendForm()}
                </div>

            </div>)
    }
}
export default Friends
