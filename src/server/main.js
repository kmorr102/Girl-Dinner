require('dotenv').config()

const express = require('express');
const router = require('vite-express');
const cors=require('cors');
const app = express();
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static('public'))

const db = require('./db/client')
db.connect()

const apiRouter = require('./api');
app.use('/api', apiRouter);

router.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);

module.exports = router;