const request = require("request")
const geoCode = require("./geocode")


const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6b38f49182c8ef7963caee8c3743cfd6&query=' + lat + ',' + lon 
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services ', error)
        } else if (body.error) {
            callback('Unable to find location', error);
        } else {
            const currentResponse = body.current
            callback(undefined, currentResponse.weather_descriptions[0] + '. It is currently ' + currentResponse.temperature + ' Degrees out, It feels like ' + currentResponse.feelslike)
        }
    })
}

module.exports = forecast