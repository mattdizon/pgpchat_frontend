import React from 'react'

class FriendElement extends React.Component{
    render(){
        return  <tr>
                    <td>{this.props.friend.friend_name}</td>
                    <td><button value = {this.props.friend.friend_name} onClick = {(e) => this.props.shouldShowMessageToFriendForm(this.props.friend)}>Send Message</button></td>
                </tr>
    }
}
export default FriendElement
