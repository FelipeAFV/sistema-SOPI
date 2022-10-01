#!/usr/bin/env node

const bodyParser = require('body-parser');
const express = require('express');
const { where } = require('sequelize');
const { Usuario } = require('./auth/models/models');
require('dotenv').config();

require('./database/db-init');
require('./database/db-associate-models').loadAllAssociations();


const app = express();

app.use(bodyParser.json());

app.get('/test', async (req, res ) => {
    res.send('App working...').end();
})

app.listen(8000);