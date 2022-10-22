const { Router } =  require('express');
const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { getManagerPurchase } = require('../application/management-service');
const { addManager } = require('./responsible-controller');
const {checkManagerPurchase} = require('./responsible-controller')
const {checkAllManager} = require('./responsible-controller')

const router = Router();


router.post('/responsables', hasProfile(['jefe_compra']), addManager);
router.get('/check/:userId', checkManagerPurchase);
router.get('/check', checkAllManager)

exports.managementRoutes = router;