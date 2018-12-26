import React from 'react'

class MessageForm extends React.Component{
    state ={
        content:"",
        
    }
    textHandler = (e) =>{
        this.setState({content:e.target.value})

    }
    submitHandler = (e) =>{
        e.preventDefault()
        fetch(`http://localhost:3000/sent_messages`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                sent_message:{
                    user_id:this.props.friendObj.id,
                    recipient_id:this.props.friendObj.friend_id,
                    content: this.state.content
                }
            })
        })
        fetch(`http://localhost:3000/recieved_messages`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                recieved_message:{
                    user_id:this.props.friendObj.friend_id,
                    sender_id: this.props.friendObj.id,
                    content: this.state.content
                }
            })
        })

    }



    render(){
        console.log(this.state);
        return (
        <div>
        <button onClick = {this.encryptionHandler}/>
            <form onSubmit = {this.submitHandler}>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Message for {this.props.friendObj.friend_name} </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" value = {this.state.content} onChange = {this.textHandler}></textarea>
                     <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>

        )
    }
}
export default MessageForm
