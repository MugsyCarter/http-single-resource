const fs = require('fs');
const promise = require('./promise');
const countryData = require('../data/countryData.json');
const sander = require( 'sander' );


function route(pathname, response, querystring) {
    console.log('About to route a request for ' + pathname);
    response.writeHeader(200, {'Content-Type': 'text/html'});  
    if (pathname === '/'){
        if(querystring){
            var inputArr = querystring.match(/=\w+/gi);
            console.log(inputArr[0].slice(1));
            var obj ={
            };
            obj.country = inputArr[0].slice(1);
            obj.capital = inputArr[1].slice(1);
            //I still need to add this object to the other JSON objects and add it to the JSON data file.  This is a good place to use a POST request.
            promise('./data/countryData.json')
                .then(function(data) {
                    var parsedData = JSON.parse(data);
                    parsedData.push(obj);
                    var jsonArray = JSON.stringify(parsedData);
                    console.log('data are ', jsonArray);
                    //sander write here work on this tonight.
                    // sander.writeFile('./data', 'countryData.json', jsonArray).then(  
                    var pData = '<p>' + jsonArray + '</p>';
                    fs.readFile('./index.html', function (err, html) {
                        if (err) {
                            throw err; 
                        }   
                        else{

                            response.write(html); 
                            response.write(pData); 
                            response.end();
                        }
                    });
                })
                    .catch(function(err){
                        console.log('caught error is ', err);
                    }); 
        }
        else{
            fs.readFile('./index.html', function (err, html) {
                if (err) {
                    throw err; 
                }   
                else
             
                promise('./data/countryData.json')
                    .then(function(data) {
                        // var parsedData = JSON.parse(data);
                        //clean up data if time permits
                        var pData = '<p>' + data + '</p>';
                        response.write(html); 
                        response.write(pData); 
                        response.end();
                    })
                    .catch(function(err){
                        console.log('caught error is ', err);
                    }); 
            });
        }
    }
    else {
        response.write('404 error, file not found');
        response.end();
    }
}

exports.route = route;