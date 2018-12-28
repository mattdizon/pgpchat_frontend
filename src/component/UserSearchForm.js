import React from 'react'
import UserRow from './UserRow'
class UserSearchForm extends React.Component{
    state = {
        userList: [],
        searchInput: "",
        displayList:[]
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users`)
        .then(resp => resp.json())
        .then(userList => (this.setState({userList})))
    }

    sendRequest = (name, id, key) =>{
        fetch('http://localhost:3000/friendships',{
            method: "POST",
            body: JSON.stringify({
                user_id: this.props.userObj.id,
                friend_id: id,
                friend_name: name,
                friend_public_key: key,
                user_public_key:this.props.userObj.public_key

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        fetch('http://localhost:3000/friendships',{
            method: "POST",
            body: JSON.stringify({
                user_id: id,
                friend_id: this.props.userObj.id,
                friend_name: this.props.userObj.username,
                friend_public_key: this.props.userObj.public_key,
                user_public_key:key
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    filterUsers = (e) => {
        this.setState({searchInput:e.target.value})
        const filteredUsers = this.state.userList.filter(userObj =>userObj.username.includes(this.state.searchInput))
        this.setState({displayList:filteredUsers })
    }
    displayFilteredUsers = () => {
        if(this.state.searchInput.length >= 3){
            return (
                this.state.displayList.map(friendObj => <UserRow friend = {friendObj} sendRequest= {this.sendRequest}/>)
            )
        }
    }



    render(){
        console.log(this.props)
        return(
            <div className="row">
            <input type="text" className="form-control input-lg" placeholder="Search Users" onChange = {this.filterUsers} value = {this.state.searchInput} />
            <table className = "searchData">
            <tbody>
            {this.displayFilteredUsers()}
            </tbody>
            </table>


            </div>
        )
    }
}
export default UserSearchForm
