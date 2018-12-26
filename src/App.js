import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from "react-router-dom";
import Home from './container/Home'
import SignUp from './container/SignUp'
import Login from './container/Login'
import Nav from './component/Nav'
import Auth from './module/Auth'

class App extends Component {
    state = {
        auth: Auth.isUserAuthenticated(),
        userObj:{},
        friendsList:[],
        pubkey:"",
        privkey:""

    }
    componentDidMount(){

            fetch("http://localhost:3000/users")
            .then(resp => resp.json())
            .then(resp =>{
                let x = resp.filter(user => user.auth_token === Auth.getToken())
                this.setState({userObj:x[0] })
            }).then(this.fetchFriends)



    }
    fetchFriends = () =>{
        if(this.state.userObj !== {}){
            fetch(`http://localhost:3000/users/${this.state.userObj.id}/friendships`)
            .then(resp => resp.json())
            .then(friendsList => this.setState({friendsList:friendsList}))
        }

    }

    encryptionHandler = () => {
        var openpgp = require('openpgp');
        openpgp.initWorker({ path:'openpgp.worker.js' })

        var options = {
            userIds: [{ name:'Jon Smith', email:'jon@example.com' }], // multiple user IDs
            curve: "ed25519",                                         // ECC curve name
            passphrase: 'super long and hard to guess secret'         // protects the private key
        };
        //function to generate PGP Keys

        let genHand = () => {
            return openpgp.generateKey(options).then(function(key) {
                var privkey = key.privateKeyArmored;
                var pubkey = key.publicKeyArmored;
                var revocationCertificate = key.revocationCertificate;
                return [pubkey,privkey]
            }).then(resp => this.setState({
                                        pubkey: resp[0],
                                        privkey:resp[1]
            }))    // protects the private key
        }
        genHand()
    }

    createAccount = (user, e) => {
        e.preventDefault()
        this.encryptionHandler()
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                user:{
                    first_name:user.first_name,
                    last_name:user.last_name,
                    username:user.username,
                    email:user.email,
                    password:user.password,
                    public_key: this.state.pubkey
                }

            })
        })
        .then(res => res.json())
        .then(res => {
            Auth.authenticateToken(res.token);
            Auth.storeUserInfo(res.user.username, res.user.id);
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
            Auth.storeUserInfo(res.user.username, res.user.id);
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
            Auth.removeUserObj()
            this.setState({
                auth: Auth.isUserAuthenticated(),
                userObj: {}
            })
        }).catch(err => console.log(err))

    }



  render() {
    console.log(this.state)
    return (

            <div>
                <Nav handleLogout=  {this.handleLogout} isUserSignIn = {this.state.auth} />
                <Route exact path = "/" render = {() => <Home userObj = {this.state.userObj} friendsList = {this.state.friendsList}/>} />
                <Route path = "/signup" render = {() => <SignUp createAccount = {this.createAccount}/>}/ >
                <Route path = "/login" render = {() => <Login handleLoginSubmit = {this.handleLoginSubmit}/>}/ >
            </div>

    );
  }
}

export default withRouter(App);
