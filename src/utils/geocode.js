const request = require('request')
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1IjoiZ2Fsc2h1bHR6IiwiYSI6ImNrdmt0N3N5cTBpbjIycW91bnR1b3p0ZWQifQ.LmDPJOfmqd_jV2cGLCvOTg'
    request({url , json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to get location data, try another search', undefined)
        }
        else {
            callback(undefined, {
                lon : body.features[0].center[0],
                lat : body.features[0].center[1],
                location: body.features[0].place_name

            })
        }
    })
}

module.exports = geoCode