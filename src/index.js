#!/usr/bin/env node

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const { verifyToken, hasProfile } = require('./auth/infraestructure/check-auth-middleware');
const multer  = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

exports.uploadMiddleware = upload;

const authRoutes = require('./auth/infraestructure/auth-routes');
const { UserService } = require('./auth/domain/user-repository');
const sopiRoutes = require('./solicitude/infraestructure/solicitudes-routes');
const { purchaseRoutes } = require('./purchases/infraestructure/purchase-routes');

const { managementRoutes } = require('./management/infraestructure/management-routes');

require('dotenv').config();

require('./database/db-init');
require('./database/db-associate-models').loadAllAssociations();


const app = express();

app.use(cors({credentials: true, origin: ['http://localhost:4200', 'http://localhost:3000']}));

app.use(bodyParser.json());
app.use(cookieParser());

/** MIDDELWARES */


app.use('/api/v1/auth/registrarse', verifyToken, hasProfile(['admin']));
app.use('/api/v1/auth/perfiles', verifyToken);
app.use('/api/v1/auth/verify', verifyToken);
app.use('/api/v1/auth/usuarios', verifyToken);


app.use('/api/v1/sopi', verifyToken);
app.use('/api/v1/compras', verifyToken);
app.use('/api/v1/gestion', verifyToken);

// app.use('\/api\/v1\/sopi$', hasProfile(['admin', 'solicitante']));

/**
 * Routes
 */

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sopi', sopiRoutes);
app.use('/api/v1/compras', purchaseRoutes);
app.use('/api/v1/gestion', managementRoutes);


if (process.env.TEST == 'true') {

    /**test */
    app.use('/api/v1/test/sopi', (req, res, next) => {
        req.user = {
            id: 1
        }
        next()
    }, sopiRoutes)

}

app.listen(8000);