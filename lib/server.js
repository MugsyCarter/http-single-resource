//This modules starts the server and begins routing
const url = require('url');
const http = require('http'); 


 
function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname; 
        var querystring = url.parse(request.url).query;
        console.log('Request for ' + pathname + ' received.'); 
        route(pathname, response, querystring);
    }
    
    const port = 8080;

    http.createServer(onRequest).listen(port);
    console.log('Server has started on port ', port );
}

exports.start = start;

