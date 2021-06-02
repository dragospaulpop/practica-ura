var http = require('http');
var fs = require('fs');

//create a server object:
http.createServer(function (req, res) {
  console.log('req: ', req.method, req.url);

  if (req.url === '/favicon.ico') {
    var fileStream = fs.createReadStream("./favicon.ico");
    return fileStream.pipe(res);
  } else {
    res.write('Hello World!'); //write a response to the client
  }
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
console.log('Server pornit pe http://localhost:8080');
