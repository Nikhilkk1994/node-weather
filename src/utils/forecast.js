const request = require('request');
const chalk = require('chalk');

let forecast = (data, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1214ffadf3993c00ddf049afb9e599c5&query=${data.lon},${data.leti}&units=f`;

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unalbe to connect to Weather app service');
        } else if (response.body.error) {
            callback(response.body.error.info);
        } else {
            callback(undefined, {
                weather_descriptions: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            });
        }
    });
}

module.exports = {
    forecast: forecast
}