//This module adds user data to the store when the submmit is clicked.
const fs = require('fs');
const promise = require('./promise');
const sander = require( 'sander' );

function addData(response, querystring){
    var inputArr = querystring.match(/=\w+(\+\w+)*/gi);
    if(inputArr.length !=2)
    {
        response.write('Enter a single Capital and Country');
    }
    else
    {
        var obj ={
        };
        obj.country = inputArr[0].slice(1).replace(/\+/g, ' ');
        obj.capital = inputArr[1].slice(1).replace(/\+/g, ' ');
        fs.readFile('./index.html', function (err, html) {
            if (err) {
                throw err; 
            }   
            else{
                response.write(html); 
                promise('./data/countryData.json')
                    .then(function(data) {
                        var parsedData = JSON.parse(data);
                        var filtered = parsedData.filter(function(entry){
                            return entry.country == obj.country;
                        });
                        if (filtered.length > 0){
                            response.write(`The database already contains and entry for ${obj.country}`); 
                            response.end();
                        } 
                        else{
                            parsedData.push(obj);
                            var jsonArray = JSON.stringify(parsedData);
                            console.log('data are ', jsonArray);
                            var pData = '<p>' + jsonArray + '</p>';
                            sander.writeFile('./data', 'countryData.json', jsonArray)
                            response.write(pData);
                            response.end();     
                        }
                    })
                    .catch(function(err){
                        console.log('caught error is ', err);
                    });  
            }
        });   
    }        

}

module.exports = addData;