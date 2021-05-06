const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geo = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// set the paths
const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../src/templates/views');
const partialsPath = path.join(__dirname, '../src/templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));


// home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nikhil K'
    });
});

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nikhil'
    });
});

// weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Please provide the correct address in query param'
        });
        return;
    }
    // async task
    geo.geoCode(req.query.address, (error, data) => {
        if (error) {
            res.send({ error: error });
        } else {
            forecast.forecast(data, (error, data) => {
                if (error) {
                    res.send({ error: error });
                } else {
                    res.send(data);
                }
            });
        }
    });
    console.log('Heloow');
});

// 404 not found
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikhil'
    });
});

// up the server
app.listen(3000, () => {
    console.log('Server is up on the port 3000');
});
