// 2. Route Handling

let url = require("http");

let server = url.createServer(function(req, res){
    if(req.url=="/"){
        res.writeHead(200,{'content-Type': 'text/html'})
        res.write('<h1>This is the Home Page</h1>')
        res.end();
    }

    else if(req.url=="/about"){
        res.writeHead(200,{'content-Type': 'text/html'})
        res.write('This is the About Page')
        res.end();
    }

    else if(req.url=="/contact"){
        res.writeHead(200,{'content-Type': 'text/html'})
        res.write('<h1>This is the Contact Page</h1>')
        res.end();

    }
});

server.listen(5500);
console.log("Route Start");