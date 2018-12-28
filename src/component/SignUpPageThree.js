import React from 'react'
class SignUpPageThree extends React.Component{
    render(){
        console.log(this.props)
        return(
        <div className="signup-form">
        <h1>Thank You for Signing Up</h1>
        <button type= "submit" onClick = {(e) => this.props.submitHandler(e)}> Press to be brought to the homepage </button>
        </div>
        )
    }
}
export default SignUpPageThree
