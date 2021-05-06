const request = require('request');
const chalk = require('chalk');

let geoCode = (address, callback) => {
    if (!address) {
        callback('Address is required Field');
        return;
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlraGlsa2FwbGFzIiwiYSI6ImNrbzh6OXJnZTIwajEyem9peDc4aXc3dWMifQ.YzKeydXrRCTmWZea_XRZMA&limit=1';
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unalbe to connect to map service');
        } else if (!response.body.features.length) {
            callback('Unable to find location with given address.');
        } else {
            let lon = response.body.features?.[0].center[0];
            let leti = response.body.features?.[0].center[1];
            callback(undefined, {
                lon: lon,
                leti: leti
            });
        }
    });
}


module.exports = {
    geoCode: geoCode
}