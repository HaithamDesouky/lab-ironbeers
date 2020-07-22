const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { style: 'index.css' });
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi);
      res.render('beers', { beersFromApi, style: 'beers.css' });
    })

    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log(randomBeer[0]);
      res.render('random-beer', {
        randomBeer,
        style: 'random.css'
      });
    })

    .catch(error => console.log(error));
});

app.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  punkAPI
    .getBeer(id)
    .then(beer => {
      console.log(beer[0]);
      res.render('singlebeer', {
        beer,
        style: 'single.css'
      });
    })

    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
