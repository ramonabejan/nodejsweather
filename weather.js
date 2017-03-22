const https = require('https');
const api = require('./api.json');

// Print out temp details
// Print out error message

//http://api.wunderground.com/api/cd1b972b83f7bc57/conditions/q/CA/Rennes.json

function printWeather(jsonBody){
    console.log(`The temperature in ${jsonBody.location.city} is ${jsonBody.current_observation.temp_c} C`);
}

function printError(error){
    console.error(error.message);
}


function get(query) {
    try{
        const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
            if(response.statusCode === 200) {
                let body = "";
                // Read the data
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => {
                    var jsonBody = JSON.parse(body);
                    if(jsonBody.location) {
                        printWeather(jsonBody);
                    }
                    else{
                        let err = new Error (`The location ${query} was not found`);
                        printError(err);
                    }
                    
                });
            }
            else{
                let err = new Error(`Error getting the response for ${query} with the status code ${http.STATUS_CODES[response.statusCode]}`);
                printError(err);
            } 
        });       

    } catch(error) {
        printError(error);
    }

  
}

module.exports.get = get;
