import React from 'react'
import AllChats from '../component/AllChats'
import Friends from '../component/Friends'
import SentMessages from '../component/SentMessages'
import RecievedMessages from '../component/RecievedMessages'
import DecryptTool from '../component/DecryptTool'
//homepage should render empty/greyed/blurred box around the messaging UI
//stating to either signup or login to the website.
// after login a user will gain access to the main UI.

class Home extends React.Component{
    state= {
        showMiddle:0
    }
    showMiddle = (e) => {
        this.setState({showMiddle:e.target.value})
    }
    renderMiddle = () =>{
        switch(this.state.showMiddle){
            case 0: console.log("a")
            break
            case 1: return <Friends friendsList = {this.props.friendsList} userObj={this.props.userObj}/>
            break
            case 2: return <SentMessages userObj = {this.props.userObj}/>
            break
            case 3: return <RecievedMessages  userObj = {this.props.userObj}/>
            break
            case 4: return <DecryptTool  userObj = {this.props.userObj}/>
            break

        }
    }


    render(){
            console.log(this.props)
        return(

            <div className = "homeContainer">
            <AllChats displayConversation = {this.displayConversation} userObj = {this.props.userObj} showMiddle = {this.showMiddle}/>
            {this.renderMiddle()}
            </div>
        )
    }
}
export default Home
