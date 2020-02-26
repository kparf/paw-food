
const proxy = require('express-http-proxy');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.use('/api',
  proxy('https://test-en.edamam.com'),
);

app.use(
  express.static(__dirname),
);

const server = app.listen(8081, () => {

  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
})

const jsonParser = bodyParser.json();
const textParser = bodyParser.text();