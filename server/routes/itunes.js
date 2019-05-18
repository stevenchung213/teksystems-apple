const express = require('express');
const router = express.Router();
const { getData, formatData } = require('../controllers');

router.use((req, res, next) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`***itunes api***\n incoming ${req.method} request from\n ${url}`);
  next();
});

router.post('/search/:term', (req, res) => {
  const { term } = req.params;
  const query = term.split(' ').join('+');
  const url = `https://itunes.apple.com/search?term=${query}`;
  
  getData(url)
    .then(resp => res.status(200).send(formatData(resp.results)))
    .catch(err => console.error(err));
});

module.exports = router;
