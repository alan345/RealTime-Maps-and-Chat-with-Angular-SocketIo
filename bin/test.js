var http = require('http');
var server = http.createServer(function(request, response) {
  response.writeHead(200,{"Content-Type":"text/plain"});
  response.end('hello');

});
server.listen(80);
console.log('server running');
//https://www.youtube.com/watch?v=N3vgozk66dI

//https://howtonode.org/how-to-install-nodejs
//https://www.youtube.com/watch?v=N3vgozk66d
