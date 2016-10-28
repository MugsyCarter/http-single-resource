// const http = require('http'); 
const url = require('url');
const http = require('http'); 
// const promise = require('./lib/promise');

// const postData = require('./postData'); 
function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname; 
        // var querystring = url.parse(request.url).query;
        console.log('Request for ' + pathname + ' received.'); 
        route(pathname, response);
    }
    
    const port = 8080;

    http.createServer(onRequest).listen(port);
    console.log('Server has started on port ', port );
}

exports.start = start;


// const server = http.createServer((req, res) => {
//     console.log('req url is ', req.url);
//     res.statusCode = 200;
//     if (req.url === '/') {
//         /* read the file in single chunk and send back */
//         fs.readFile('index.html', 'utf-8', (err, data) => {
//             if (err) {
//                 res.statusCode = 500;
//                 res.end('page read fail');
//             }
//             else {
//                 res.write(data);
//                 res.end();
//             }
//         });

//         // stream each chunk from file to web response
//         const stream = fs.createReadStream('index.html');
//         stream.on('data', data => {
//             res.write(data);
//         });
//         stream.on('end', () => {
//             res.end();
//         });

//         indexHtml.pipe(res);
//     }
//     else {
//         res.write(`heeloo world, you asked for ${req.url}`);
//         res.end();
//     }
// });

// module.exports = server;