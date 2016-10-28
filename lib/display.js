//this modules is resplonsible for displaying the data on the webpage
//it calls promises and appends that data to the page.
const fs = require('fs');
const promise = require('./promise');
const display = {};

//this function adds a capital and country to the JSON file and page when a user hits submit.
display.addCapital = function(){};




//this function displays the homepage.
display.showHome = function(response){
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
};




module.exports = display; 
