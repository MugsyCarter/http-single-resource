const fs = require('fs');
const promise = require('./promise');
const countryData = require('../data/countryData.json');
// const sander = require( 'sander' );


function route(pathname, response) {
    console.log('About to route a request for ' + pathname);
    response.writeHeader(200, {'Content-Type': 'text/html'});  
    if (pathname === '/'){
        fs.readFile('./index.html', function (err, html) {
            if (err) {
                throw err; 
            }   
            else
            response.write(html); 
            promise('./data/countryData.json')
                .then(function(data) {
                    // var parsedData = JSON.parse(data);
                    var pData = '<p>' + data + '</p>';
                    response.write(pData); 
                    response.end();
                })
                .catch(function(err){
                    console.log('caught error is ', err);
                }); 
        });
    }
    else {
        response.write('404 error, file not found');
        response.end();
    }
    // else if (pathname === '/Spanish'){
    //     if(querystring === 'time=morning'){
    //         message = 'Buenos dias, Mundo'; 
    //     }
    //     else if(querystring === 'time=afternoon'){
    //         message = 'Buenos tardes, Mundo'; 
    //     }
    //     else if (querystring === 'time=evening'){
    //         message = 'Buenos noches, Mundo'; 
    //     }
    //     else message ='Hola, Mundo.\n Query the time of day to get a more specific response.  Options are "time=morning", "time=afternoon", and "time=evening".';
    // 
}

exports.route = route;