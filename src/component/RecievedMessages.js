import React from 'react'

class RecievedMessages extends React.Component{
    state = {
        recievedMessages:[],
        showMessage:false,
        msgObj:{}
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userObj.id}/recieved_messages`)
        .then(resp => resp.json())
        .then(recievedMessages => this.setState({recievedMessages}))
    }
    showDetail = (msg) =>{
        this.setState({showMessage: !this.state.showMessage,
        msgObj: msg})
    }
    shouldShowDetail = () =>{
        if (this.state.showMessage === true){
            return (
                <div className = "rightFloat">
                    <h1>Message for: {this.state.msgObj.sender_name} </h1>
                    <p> {this.state.msgObj.content}</p>
                </div>
            )
        }
    }
    renderMessages = () =>{
        return this.state.recievedMessages.map(msg => {
            return <tr onClick ={(e) => this.showDetail(msg)}>
                        <td>
                            <h1>{msg.sender_name}</h1>
                        </td>
                        <td>
                        <p>{Date(msg.created_at)}</p>
                        </td>
                    </tr>
        })
    }

    render(){
        console.log(this.state)
        return (
            <div className = "middleContainer">
                <div className = "innerMiddleDiv">
                <h1>Recieved Messages</h1>
                <table>
                    <tbody>

                        {this.renderMessages()}

                    </tbody>
                </table>
                </div>

                {this.shouldShowDetail()}

            </div>
        )
    }
}
export default RecievedMessages
