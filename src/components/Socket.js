import React, { useState } from 'react';
// import io from 'socket.io-client'
// import Websocket from 'react-websocket'
//www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo
// const socket = io('http://localhost:3000/validate', {headers: { 'Authorisation': localStorage.token }})
// const socket = new WebSocket('ws://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo')
const Socket = () => {

    const [ data, setData ] = useState([])

    // const socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops')

    // Listen to the channel's messages
    // socket.on('message', message => {
    //     setData(message)
    //     console.log(message)
    // })
    
    // // Connect to the channel
    // socket.on('connect', () => {

    // // Subscribe to topics (i.e. appl,fb,aig+)
    // socket.emit('subscribe', 'snap,fb,aig+')

    // // Unsubscribe from topics (i.e. aig+)
    // socket.emit('unsubscribe', 'aig+')
    // })

    // Disconnect from the channel
    // socket.on('disconnect', () => console.log('Disconnected.'))

    // handleData(data) {
    //     let result = JSON.parse(data);
    //     this.setState({user: result});
    //   }


        // socket.addEventListener('message', function (event) {
        //     console.log('Message from server ', event.data);
        // })
        // socket.on('connect', () => {
        //     console.log(socket.connected); // true
        //   })
        return (
            <div>
                
 
                {/* <Websocket url='ws://localhost/3001'
                    onMessage={this.handleData.bind(this)}/> */}
            </div>
        );
}

export default Socket;