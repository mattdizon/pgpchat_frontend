import React from 'react'
import AllChats from '../component/AllChats'
import SingleMessage from '../component/SingleMessage'
//homepage should render empty/greyed/blurred box around the messaging UI
//stating to either signup or login to the website.
// after login a user will gain access to the main UI.

class Home extends React.Component{
    state = {
        showMessage: ""
    }
    displayConversation = (data, e) => {
        this.setState({showMessage:data})
    }
    render(){
        return(
            <div className = "homeContainer">
            <AllChats displayConversation = {this.displayConversation}/>
            <SingleMessage />
            </div>
        )
    }
}
export default Home
