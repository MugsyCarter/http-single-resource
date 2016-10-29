//this modules is resplonsible for displaying the data on the webpage
//it calls promises and appends that data to the page.
const fs = require('fs');
const promise = require('./promise');
const display = {};

//this function displays the homepage.
display.showHome = function(response){
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err; 
        }   
        else
        response.write(html); 
        promise('./data/countryData.json')
                .then(function(data) {  
                    response.write('<h3>Country : Capital</h3>');
                    var parsedData = JSON.parse(data);
                    parsedData.sort(function(a, b){
                        return a.country.localeCompare(b.country);
                    });
                    parsedData.forEach(function(entry){
                        response.write('<p>' + entry.country + ' : ' + entry.capital + '</p>');
                    });
                    response.end();
                })
                .catch(function(err){
                    console.log('caught error is ', err);
                }); 
    });
};




module.exports = display; 
