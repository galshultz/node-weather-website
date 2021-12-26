const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gal Shultz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gal Shultz'
    })
})

app.get('/weather', (req, res) => {

    const userLocation = req.query.address

    if (!userLocation) {
        return res.send({
            error: 'You must provide an address!'
        })
    } else {
        geoCode(userLocation, (error, {lon,lat,location} = {}) => {
            if (error) {
                return res.send({
                    error: 'There was an error getting the information'
                })
            }
            forecast(lon, lat, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: 'There was an error getting the information'
                    })
                }
                res.send({
                    forecest: forecastData,
                    address: userLocation,
                    location
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is a help message. Please help me!',
        title: 'Help',
        name: 'Gal Shultz'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        error: 'Help article was not found',
        name: 'Gal Shultz'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        error: 'Page was not found',
        name: 'Gal Shultz'
    })
})
app.listen(3001, () => {
    console.log('Server is up on port 3001')
})