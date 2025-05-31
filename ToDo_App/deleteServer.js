const http = require("http")
const path = require("path")
const fs = require("fs")
const { url } = require("inspector")

const filePath = path.join(__dirname, './db/todo.json')



const server = http.createServer((req, res) =>{
   
    // console.log(req.url, req.method);

    const url = new URL(req.url, `http://${req.headers.host}`);
    // console.log(url);

    const pathname = url.pathname

    
    //get all todos
    // if(req.url === "/todos" && req.method === "GET"){
    if(pathname === "/todos" && req.method === "GET"){
        const data = fs.readFileSync(filePath, {encoding: "utf-8"})
        res.writeHead(200, {
            "content-type" : "application/json",
        })
        
        res.end(
            data
        );
    }

    //post a todo
    // else if (req.url === "/todos/create-todo" && req.method === "POST"){
    else if (pathname === "/todos/create-todo" && req.method === "POST"){

        let data = ""

        req.on('data', (chunk) =>{
            data = data + chunk
        })

        

        req.on('end', () =>{
            // console.log(data);
            const {title, body} = JSON.parse(data)
            // console.log({title, body});

            const createdAt = new Date().toLocaleString()

            const allTodos = fs.readFileSync(filePath, {encoding: "utf-8"})

            const parsedAllTodos = JSON.parse(allTodos)

            console.log(parsedAllTodos);

            parsedAllTodos.push({title, body, createdAt})

            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {encoding: "utf-8"})

            res.end(JSON.stringify({title, body, createdAt}, null, 2))
        })
    } 

    //get single todo
    // else  if(req.url.startsWith("/todo") && req.method === "GET"){
    else  if(pathname === '/todo' && req.method === "GET"){
        const title = url.searchParams.get("title")
        console.log(title);
        const data = fs.readFileSync(filePath, {encoding: "utf-8"})
        const parsedData = JSON.parse(data)

        const todo = parsedData.find((todo) => todo.title === title)

        const stringifiedTodo =  JSON.stringify(todo)
        res.writeHead(200, {
            "content-type" : "application/json",
        })
        
        res.end(stringifiedTodo);

        
    }

    // update a todo
     else if (pathname === "/todos/update-todo" && req.method === "PATCH"){
        const title = url.searchParams.get("title")
        let data = ""

        req.on('data', (chunk) =>{
            data = data + chunk
        })


        req.on('end', () =>{
            const { body} = JSON.parse(data)

            const allTodos = fs.readFileSync(filePath, {encoding: "utf-8"})
            const parsedAllTodos = JSON.parse(allTodos)


            const indexTodo = parsedAllTodos.findIndex((todo) => todo.title === title)

            parsedAllTodos[indexTodo].body = body

            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {encoding: "utf-8"})

            res.end(JSON.stringify({title, body, createdAt: parsedAllTodos[indexTodo].createdAt}, null, 2))
        })
    } 


    // delete a todo
     else if (pathname === "/todos/delete-todo" && req.method === "DELETE"){
        const title = url.searchParams.get("title")
        
        const data = fs.readFileSync(filePath, {encoding: "utf-8"})
        const todo = JSON.parse(data)

        const filteredTodo = todo.filter(todo => todo.title !== title)

        if(todo.length === filteredTodo.length){
            res.writeHead(404, {"content-type": "application/json"})
            return res.end(JSON.stringify({error: 'todo not found'}))
        }

        fs.writeFileSync(filePath, JSON.stringify(filteredTodo, null, 2), {encoding: "utf-8"})

        res.writeHead(200, {"content-type": "application/json"})

        res.end(JSON.stringify({message: `todo with title ${title} deleted successfully.`}))
    } 

    else{
        res.end("route not found")
    }
})

server.listen(5000, '127.0.0.1', () =>{
    console.log('server listing to port 5000');
})