import React, { Component } from 'react';
import Websocket from 'react-websocket'
// import io from 'socket.io-client'
//www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo
// const socket = io('http://localhost:3000/validate', {headers: { 'Authorisation': localStorage.token }})
// const socket = new WebSocket('ws://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo')
class Socket extends Component {

    state = {
        user: null
    }

    // handleData(data) {
    //     let result = JSON.parse(data);
    //     this.setState({user: result});
    //   }

    render() {
        // socket.addEventListener('message', function (event) {
        //     console.log('Message from server ', event.data);
        // })
        // socket.on('connect', () => {
        //     console.log(socket.connected); // true
        //   })
        return (
            <div>
                Count: <strong>{this.state.count}</strong>
 
                {/* <Websocket url='ws://localhost/3001'
                    onMessage={this.handleData.bind(this)}/> */}
            </div>
        );
    }
}

export default Socket;