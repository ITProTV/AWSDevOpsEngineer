const http = require('http')
const app = require('./app')
const log = global.console.log.bind(global.console)

const server = http.createServer(app)
const port  = process.env.PORT || 8080

server.on('listening', onListen)
server.on('close', onClose)
server.on('exit', onExit)
server.listen(port)

function onListen(){
    log(`Now listening on port: ${port}`)
}
function onClose(){
    log(`Shutting down gracefully...`)
    process.exit(0)
}
function onExit(err){
    log(`Error: ${err}`)
    log(`Closing down...`)
    process.exit(1)
}
