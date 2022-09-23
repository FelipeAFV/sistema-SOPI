const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const app = express();



app.use(bodyParser.json());

app.get('/test', (req, res ) => {
    res.send('App working...').end();
    
})

app.listen(8000);