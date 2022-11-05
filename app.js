const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(`${__dirname}/views/partials`);



//home
app.get('/', (req, res) => {
  req.app.locals.pageTitle = "Home";
  res.render('index');
});


//beers
app.get('/beers', (req, res) => {
  req.app.locals.pageTitle = "Beers";
  punkAPI.getBeers()
  .then((allBeers)=>{    
    res.render('beers',{allBeers});
  })
  .catch((error)=>{
    console.log(error);
  }); 
});


//random-beer
app.get('/random-beer', (req, res) => {
  req.app.locals.pageTitle = "RandomBeer"
  punkAPI.getRandom()
  .then((beer)=>{    
    res.render('random-beer',{beer});
  })
  .catch((error)=>{
    console.log(error);
  }); 
});




app.listen(3000, () => console.log('🏃‍ on port 3000'));
