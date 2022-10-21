const { Router } =  require('express');
const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { getManagerPurchase } = require('../application/management-service');
const { addManager } = require('./responsible-controller');

const router = Router();


router.post('/responsables', hasProfile(['jefe_compra']), addManager);
router.get('/', getManagerPurchase);

exports.managementRoutes = router;