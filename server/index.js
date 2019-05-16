const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname + '/../dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});





app.listen(port, () => {
  console.log('express serving the application at http://localhost:' + port);
});