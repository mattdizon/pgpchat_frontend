import React from 'react'
import SignUpPageOne from '../component/SignUpPageOne'
import SignUpPageTwo from '../component/SignUpPageTwo'
import SignUpPageThree from '../component/SignUpPageThree'
class SignUp extends React.Component{
//need to fill stringify body
state = {
    username: "",
    email: "",
    password: "",
    first_name:"",
    last_name:"",
    pageNum: 1,
    pub_key: ""
}
pageHandler = (data, x) => {
    if (this.state.pageNum === 1){
        //set state of userinfo
        this.setState({
            username: data.username,
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name:data.last_name,
            pageNum: 2})
    }
    if (this.state.pageNum === 2){
        //set state of pgp keys
        this.setState({
            pub_key:data,
            pageNum:3
        })
    }

}
submitHandler = (e) =>{
    this.props.createAccount(this.state,e)

}
signUpPageRender = () =>{
    switch(this.state.pageNum){
        case 1:
        return <SignUpPageOne pageHandler = {this.pageHandler}/>
        break
        case 2:
        return <SignUpPageTwo  pageHandler = {this.pageHandler} user = {this.state} />
        break
        case 3:
        return <SignUpPageThree  submitHandler = {this.submitHandler}/>
        break

    }
}
    render(){
        console.log(this.state)
        return (
            this.signUpPageRender()
        )

    }
}
export default SignUp
