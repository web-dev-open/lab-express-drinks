const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

hbs.registerPartials(__dirname + '/views/partials');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public/images'));

// Register the location for handlebars partials here:
app.get('/', function (req, res) {
  req.app.locals.myTitle = 'Home';
  res.render(__dirname + '/views/index.hbs');
});
app.get('/beers', function (req, res) {
  const beers = punkAPI.getBeers(req.query);
  beers
    .then(beersFromApi =>
      res.render(__dirname + '/views/beers.hbs', { beersFromApi })
    )
    .catch(error => console.log(error));
});

app.get('/randomBeer', function (req, res) {
  req.app.locals.myTitle = 'Random Beer';
  var randomBeer = punkAPI.getRandom();

  randomBeer
    .then(beer => res.render(__dirname + '/views/randomBeer.hbs', { beer }))
    .catch(error => console.log(error));
});

app.get('/beer/:id', function userIdHandler(req, res) {
  var beer = punkAPI.getBeer(req.params.id);

  beer
    .then(beer => res.render(__dirname + '/views/oneBeer.hbs', { beer }))
    .catch(error => console.log(error));
});
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
