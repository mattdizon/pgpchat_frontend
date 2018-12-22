import React from 'react'

class UserSearchForm extends React.Component{
    state = {
        userList: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users`)
        .then(resp => resp.json())
        .then(userList => (this.setState({userList})))
    }


    render(){
        return(
            <div class="row">
                <input type="text" className="form-control input-lg" placeholder="Search Users" />
                <table className ="searchData">
                    <tr>
                        <td>Bob</td>
                        <td>Addfrien</td>
                    </tr>
                </table>


            </div>
        )
    }
}
export default UserSearchForm
