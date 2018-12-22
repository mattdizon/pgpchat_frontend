import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import Home from './container/Home'
import SignUp from './container/SignUp'
import Login from './container/Login'
import Nav from './component/Nav'
import Auth from './module/Auth'

class App extends Component {
    state = {
        auth: Auth.isUserAuthenticated()
    }


    createAccount = (user, e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                user:{
                    first_name:user.first_name,
                    last_name:user.last_name,
                    username:user.username,
                    email:user.email,
                    password:user.password
                }

            })
        })
        .then(res => res.json())
        .then(res => {
            Auth.authenticateToken(res.token);
            this.setState({
                auth: Auth.isUserAuthenticated(),
            })



        })
        .catch(err =>console.log(err))
        this.props.history.push("/");

    }

    handleLoginSubmit = (data,e) =>{
        e.preventDefault();
        fetch('http://localhost:3000/login',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res =>{
            Auth.authenticateToken(res.token);
            this.setState({
                auth: Auth.isUserAuthenticated(),
            })
         })
         .catch(err => console.log(err))
         this.props.history.push("/");
    }

    handleLogout = () => {
        fetch('http://localhost:3000/logout',{
            method: "DELETE",
            headers: {
                token: Auth.getToken(),
                'Authorization': `Token ${Auth.getToken()}`,
            }
        })
        .then(res => {
            Auth.deauthenticateToken()
            this.setState({
                auth: Auth.isUserAuthenticated()
            })
        }).catch(err => console.log(err))

    }

  render() {

    return (

            <div>
                <Nav handleLogout=  {this.handleLogout} isUserSignIn = {this.state.auth} />
                <Route exact path = "/" render = {() => <Home />} />
                <Route path = "/signup" render = {() => <SignUp createAccount = {this.createAccount}/>}/ >
                <Route path = "/login" render = {() => <Login handleLoginSubmit = {this.handleLoginSubmit}/>}/ >
            </div>

    );
  }
}

export default withRouter(App);
