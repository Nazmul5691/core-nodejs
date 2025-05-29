const http = require("http")

const server = http.createServer((req, res) =>{
    res.end('Welcome to TODO app server')
})

server.listen(5000, '127.0.0.1', () =>{
    console.log('server listing to port 5000');
})