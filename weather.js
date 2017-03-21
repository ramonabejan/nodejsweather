const https = require('https');
const api = require('./api.json');

// Print out temp details
// Print out error message

//http://api.wunderground.com/api/cd1b972b83f7bc57/conditions/q/CA/Rennes_France.json


function get(query) {
    const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
        let body = "";
        // Read the data
        response.on('data', chunk => {
            body += chunk;
        });
        response.on('end', () => {
            var jsonBody = JSON.parse(body);
            console.log(`The temperture in ${query} is ${jsonBody.current_observation.temp_c} Celcius`)

            //Parse data
            //Print the data
        });


    });
}

module.exports.get = get;

//TODO: Handle any errors