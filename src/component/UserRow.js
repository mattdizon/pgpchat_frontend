import React from 'react'

class UserRow extends React.Component{

    render(){

        return(
            <tr>
                <td>{this.props.friend.username}</td>
                <td><button value = {this.props.friend.id} onClick = {(e) => this.props.sendRequest(this.props.friend.username,this.props.friend.id )}>Add User </button></td>
                </tr>

        )
    }
}
export default UserRow
