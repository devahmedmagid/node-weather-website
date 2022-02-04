const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ahmed Magid',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Ahmed Magid',
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term!',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is a help message!',
    title: 'Help',
    name: 'Ahmed Magid',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No Address Found',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longtiude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longtiude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }

        return res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(3000, () => {});
