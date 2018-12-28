import React from 'react'
class SignUpPageTwo extends React.Component{
    state = {
        pubkey:"",
        privkey:""
    }
    encryptionHandler = (e) => {
        e.preventDefault()
        var openpgp = require('openpgp');
        openpgp.initWorker({ path:'openpgp.worker.js' })

        var options = {
            userIds: [{ name:this.props.user.username, email:this.props.user.email }], // multiple user IDs
            numBits: 4096,                                       // ECC curve name
            passphrase: "123456"        // protects the private key
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

showGenerateButton = () =>{
    if (this.state.pubkey === ""){
        return <button onClick = {this.encryptionHandler}className="btn btn-success btn-lg btn-block">Generate Keys</button>
    }

    else{
        return<button onClick = {(e) => {
            e.preventDefault()
            this.props.pageHandler(this.state.pubkey,2)
        } }className="btn btn-success btn-lg btn-block">Continue To Complete Account</button>
    }

}
    render(){
        return (
            <div className="signup-form">
                <form  onChange = {this.handleChange}>
                    <h2>Generate PGP Keys</h2>
                        <textarea className="public-key"
                        placeholder="First Name"  name = "first_name"
                        value = {this.state.pubkey} readonly required="required"/>

                        <textarea className="private-key" name = "last_name"  placeholder="Last Name"
                        value= {this.state.privkey} readonly required="required"/>

                        {this.showGenerateButton()}



                </form>
                <div className="text-center">Already have an account?</div>
            </div>
        )
    }
}
export default SignUpPageTwo
