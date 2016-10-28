//this modules routes the responses based on the URL
const display = require('./display');
const addData = require('./addData');

function route(pathname, response, querystring) {
    console.log('About to route a request for ' + pathname);
    response.writeHeader(200, {'Content-Type': 'text/html'});  
    if (pathname === '/'){
        if(querystring){
            addData(response, querystring);
        }
        else{
            display.showHome(response);
        }
    }
    // else if (pathName === '/data')
    //possible data page here

    else {
        response.write('404 error, file not found');
        response.end();
    }
}

exports.route = route;