import React from 'react'
import {NavLink} from 'react-router-dom'

class Nav extends React.Component{


    isLoggedIn = () =>{
        if(this.props.isUserSignIn === true){
            return (
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <div className="navbar-brand"><NavLink to = "/">Logo</NavLink></div>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><NavLink to = "/">Home</NavLink></li>

                            <li><NavLink to = "/" onClick = {this.props.handleLogout}>Logout</NavLink></li>
                        </ul>
                    </div>
                </nav>
            )
        }
        else{
            return (
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <div className="navbar-brand"><NavLink to = "/">Logo</NavLink></div>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><NavLink to = "/">Home</NavLink></li>
                            <li><NavLink to = "/signup" >Sign Up</NavLink></li>
                            <li><NavLink to = "/login">Login</NavLink></li>

                        </ul>
                    </div>
                </nav>
            )
        }
    }


    render(){
        console.log(this.props)
        return(
            <div>
            {this.isLoggedIn()}
            </div>
        )
    }

}
export default Nav
// <nav className="navbar navbar-default">
//     <div className="container-fluid">
//         <div className="navbar-header">
//             <div className="navbar-brand"><NavLink to = "/">Logo</NavLink></div>
//         </div>
//         <ul className="nav navbar-nav">
//             <li><NavLink to = "/">Home</NavLink></li>
//             <li><NavLink to = "/signup" >Sign Up</NavLink></li>
//             <li><NavLink to = "/login">Login</NavLink></li>
//             <button onClick = {this.props.handleLogout}>Logout</button>
//         </ul>
//     </div>
// </nav>
