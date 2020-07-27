import openSocket from 'socket.io-client'
import config from './config.mjs'
const  socket = openSocket(config.SERVER_URL)
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp))
  socket.emit('subscribeToTimer', 1000)
}
export { subscribeToTimer }