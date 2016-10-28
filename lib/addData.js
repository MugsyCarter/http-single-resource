//This module adds user data to the store when the submmit is clicked.
// const fs = require('fs');
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
        // fs.readFile('./index.html', function (err, html) {
        //     if (err) {
        //         throw err; 
        //     }   
        //     else{
        //         response.write(html); 
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
                    // response.write('<p>Country : Capital</p>');
                    // parsedData.forEach(function(entry){
                    //     response.write('<p>' + entry.country+' : '+entry.capital +'</p>');
                    // });
                    console.log('parsed data are ', parsedData);
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
        // });   
    // }        

// }

module.exports = addData;