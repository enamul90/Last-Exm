// 3. File Operations:

let fs = require("fs");
let url = require("http");

let server = url.createServer(function(req, res){
    if(req.url=="/file-write"){
        fs.writeFile('demo.txt',"hello world", function(error){
            if(error){
                res.writeHead(200,{'content-Type': 'text/html'})
                res.write("file write fail")
                res.end();
            }

            else{
                res.writeHead(200,{'content-Type': 'text/html'})
                res.write("file write done")
                res.end();
            }
            
            
        });
    }
});

server.listen(5050);
console.log("Start");