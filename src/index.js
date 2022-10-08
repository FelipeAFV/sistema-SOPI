#!/usr/bin/env node

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const { verifyToken, hasProfile } = require('./auth/middlewares/check-auth');

const authRoutes = require('./auth/routes/auth-routes');
const { UserService } = require('./auth/services/user-service');
require('dotenv').config();

require('./database/db-init');
require('./database/db-associate-models').loadAllAssociations();


const app = express();



app.use(bodyParser.json());
app.use(cookieParser());

/** MIDDELWARES */
//app.use('/api/v1/auth/registrarse', verifyToken, hasProfile('admin'));


app.get('/test', async (req, res ) => {
    try {
        const {username} = req.body;
        if (!username) {
            res.status(400).json({message: 'Se debe ingresar el nombre de usuario'});
            return;
        } 

        const user = await UserService.findUserByUsername(req.body.username);
        console.log(await user.getProfile())
        if (!user) {
            res.status(400).json({message: `No existe el usuario '${username}'`});
            return;
        }
        res.status(200).json(user);
        return;

    } catch (e) {
        res.status(500).json({message: 'Error'});
        console.log(e)
        return;
    }
})


app.use('/api/v1/auth', authRoutes)

app.listen(8000);