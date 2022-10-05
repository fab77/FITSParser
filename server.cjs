var http = require('http');

var nStatic = require('node-static');

console.log("serving content in ./webtest on http://localhost:5000");
var fileServer = new nStatic.Server('./webtest');

http.createServer(function (req, res) {
    
    fileServer.serve(req, res);

}).listen(5000);
