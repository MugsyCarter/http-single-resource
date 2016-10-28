//This module adds user data to the store when the submmit is clicked.
const promise = require('./promise');
const sander = require( 'sander' );
const display = require('./display');

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
        promise('./data/countryData.json')
            .then(function(data) {
                var parsedData = JSON.parse(data);
                var filtered = parsedData.filter(function(entry){
                    return entry.country == obj.country;
                });
                if (filtered.length > 0){
                    response.write(`The database already contains an entry for ${obj.country}`); 
                    response.end();
                } 
                else{
                    parsedData.push(obj);
                    var jsonArray = JSON.stringify(parsedData);
                    sander.writeFile('./data', 'countryData.json', jsonArray);
                    display.showHome(response);

                }
            })
            .catch(function(err){
                console.log('caught error is ', err);
            });
    }  
}

module.exports = addData;