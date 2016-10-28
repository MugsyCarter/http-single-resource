//this modules routes the responses based on the URL
const display = require('./display');
const addData = require('./addData');
const sander = require( 'sander' );

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
    else if(pathname === '/nuke'){
        response.write('<h1>Boom!</h1>');
        // var nukedJson = [{"The Wasteland": "Mutant City"}];
        var nuked = [{country: "The Wasteland", capital: "Mutant City"}];
        var nukedJson = JSON.stringify(nuked);
        sander.writeFile('./data', 'countryData.json', nukedJson)
        .then(display.showHome(response))
        .catch(function(err){
            console.log('caught error is ', err);
        });
    }
    else {
        response.write('404 error, file not found');
        response.end();
    }
}

exports.route = route;