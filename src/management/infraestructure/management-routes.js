const { Router } =  require('express');
const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { addManager } = require('./responsible-controller');


const router = Router();


router.post('/responsables', hasProfile(['jefe_compra','director']), addManager);


exports.managementRoutes = router;