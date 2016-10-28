const server = require('./lib/server');
// const promise = require('./lib/promise');
// const fs = require('fs');
// const http = require('http');
// const indexHtml = fs.createReadStream('index.html');
const router = require('./lib/router');

server.start(router.route);