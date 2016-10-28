//This page is the jumping off point for the app
// 'node index.js' is the console start command
const server = require('./lib/server');
const router = require('./lib/router');

server.start(router.route);