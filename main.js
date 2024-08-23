//  1. Server Setup

let url = require("http");

let server = url.createServer(function(req, res){
    res.end("hello World")
});

server.listen(5500);
console.log("it is listening on port 5500");