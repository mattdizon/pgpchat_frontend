import React from 'react'
class MessageForm extends React.Component{
    state ={
        contentSender:"",
        contentRecipient:"",
        content:"",
        submitButton:false

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
                    user_id:this.props.friendObj.user_id,
                    recipient_id:this.props.friendObj.friend_id,
                    recipient_name:this.props.friendObj.friend_name,
                    content: this.state.contentSender
                }
            })
        })
        fetch(`http://localhost:3000/recieved_messages`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                recieved_message:{
                    user_id:this.props.friendObj.friend_id,
                    sender_id: this.props.friendObj.user_id,
                    sender_name: this.props.user,
                    content: this.state.contentRecipient
                }
            })
        })

    }
    messageEncryptionFunction = (e) => {
        e.preventDefault()

        var openpgp = require('openpgp');



    // put keys in backtick (``) to avoid errors caused by spaces or tabs
    const pubkeyRecipient = this.props.friendObj.friend_public_key

const pubkeySender = this.props.friendObj.user_public_key


    const encryptDecryptFunction = async() => {



        const optionsSent = {
            message: openpgp.message.fromText(this.state.content),       // input as Message object
            publicKeys: (await openpgp.key.readArmored(pubkeyRecipient)).keys, // for encryption

        }

        openpgp.encrypt(optionsSent).then(ciphertext => {
             // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
            console.log(ciphertext.data)
            this.setState({contentRecipient:ciphertext.data})
        })



        const optionsRecieved = {
            message: openpgp.message.fromText(this.state.content),       // input as Message object
            publicKeys: (await openpgp.key.readArmored(pubkeySender)).keys, // for encryption

        }

        openpgp.encrypt(optionsRecieved).then(ciphertext => {
             // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
            console.log(ciphertext.data)
            this.setState({contentSender:ciphertext.data})
        })
        this.setState({content:this.state.contentRecipient,
                        submitButton: true})


        // .then(encrypted => {
        //     const options = {
        //         message: await openpgp.message.readArmored(encrypted),    // parse armored message
        //         publicKeys: (await openpgp.key.readArmored(pubkey)).keys, // for verification (optional)
        //         privateKeys: [privKeyObj]                                 // for decryption
        //     }
        //
        //     openpgp.decrypt(options).then(plaintext => {
        //         console.log(plaintext.data)
        //         return plaintext.data // 'Hello, World!'
        //     })
        //
        // })
    }

    encryptDecryptFunction()
}

displayButton = ()=>{
    if (this.state.submitButton === true){
        return <input type = "submit" value = "Submit"/>
    }else{
        return <input onClick = {(e)=> this.messageEncryptionFunction(e)} type="button" value="Encrypt Message"/>
    }
}

    render(){
        return (
        <div>
            <form onSubmit = {this.submitHandler}>
                <div>
                    <h1 >Message for {this.props.friendObj.friend_name} </h1>
                    <textarea rows="10" value = {this.state.content} onChange = {this.textHandler}/>
                    <br/>
                     {this.displayButton()}
                </div>
            </form>
        </div>

        )
    }
}
export default MessageForm
