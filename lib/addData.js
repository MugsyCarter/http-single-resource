//This module adds user data to the store when the submmit is clicked.
const fs = require('fs');
const promise = require('./promise');
const sander = require( 'sander' );

function addData(response, querystring){
    var inputArr = querystring.match(/=\w+(\+\w+)*/gi);
    // if inputArr.length
    console.log(inputArr[0].slice(1));
    var obj ={
    };
    obj.country = inputArr[0].slice(1).replace('+', ' ');
    obj.capital = inputArr[1].slice(1).replace('+', ' ');
    //I still need to add this object to the other JSON objects and add it to the JSON data file.  This is a good place to use a POST request.
    promise('./data/countryData.json')
        .then(function(data) {
            var parsedData = JSON.parse(data);
            parsedData.push(obj);
            var jsonArray = JSON.stringify(parsedData);
            console.log('data are ', jsonArray);
            //sander write here work on this tonight.
            sander.writeFile('./data', 'countryData.json', jsonArray)
                .then(console.log('Sander Done.'));  
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

module.exports = addData;