const http = require("http")

const data = [
    {
        "title" : "postgresql",
        "body" : "learn postgresql"
    },
    {
        "title" : "node",
        "body" : "learn node"
    },
]

const server = http.createServer((req, res) =>{
    // console.log(req.url, req.method);
    // res.end('Welcome to TODO app server')

    if(req.url === "/todos" && req.method === "GET"){
        // res.end("All todos");

        // res.writeHead(201, {
        //     "content-type" : "text/plain",
        //     "email" : "new@email.com"
        // })

        res.writeHead(200, {
            // "content-type" : "application/json",
            "content-type" : "text/html",
            // "email" : "new@email.com"
        })
        
        // res.setHeader("content-type", "text/plain")
        // res.setHeader("email", "new2@email.com")
        // res.statusCode = 201

        // res.end("Hello TODOS");
        // res.end(JSON.stringify(data));
        res.end(`<h1>hello world </h1> <h2>hello world </h2> <h3>hello world </h3>`);
    }
    else if (req.url === "/todos/create-todo" && req.method === "POST"){
        res.end({
            "id" : 124
        })
    }
    else{
        res.end("route not found")
    }
})

server.listen(5000, '127.0.0.1', () =>{
    console.log('server listing to port 5000');
})