import React from 'react'

class DecryptTool extends React.Component{
    state = {
        message:"",
        private_key:""
    }


    messageEncryptionFunction = (e) => {
        e.preventDefault()

        var openpgp = require('openpgp');



    // put keys in backtick (``) to avoid errors caused by spaces or tabs
    const private_key = this.state.private_key
    const message = this.state.message



const passphrase = `123456`
    const encryptDecryptFunction = async() => {


        const privKeyObj = (await openpgp.key.readArmored(private_key)).keys[0]
        await privKeyObj.decrypt(passphrase)

            const options = {
                message: await openpgp.message.readArmored(message),    // parse armored message

                privateKeys: [privKeyObj]                                 // for decryption
            }

            openpgp.decrypt(options).then(plaintext => {
                console.log(plaintext.data)
                return plaintext.data // 'Hello, World!'
            })

        // })
    }

    encryptDecryptFunction()
}
    decryptMessage = () =>{
        console.log("Hello")
    }
    textHandlerMsg = (e) =>{

        this.setState({message:e.target.value})
        console.log(this.state.message)
    }
    textHandlerKey = (e) =>{

        this.setState({private_key:e.target.value})
        console.log(this.state.private_key)
    }
    render(){
        return(
            <div className = "middleContainer">
            <h1>Message Decryption Tool</h1>
            <textarea name = "message" value = {this.state.message }onChange = {this.textHandlerMsg} placeholder ="Encrypted Message"/>
            <textarea name = "private_key"value = {this.state.private_key}onChange = {this.textHandlerKey} placeholder = "Private Key"/>
            <button onClick = {this.messageEncryptionFunction} >Decrypt Message</button>
            </div>
        )
    }
}
export default DecryptTool
