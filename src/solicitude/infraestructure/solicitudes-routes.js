const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { getAllCostCenter } = require('./costcenter-controller');
const { getAllFinancing } = require('./financing-controller');
const { addNewSopi, getSopi, updateSopi, getAllSopi } = require('./sopi-controller');
const { verifyUpdateStatusPermissions, sopiDetailPermission } = require('./sopi-middleware');

const Router = require('express').Router;

const router = Router();

// SOPI
router.get('/', getAllSopi);
router.post('/', hasProfile(['director', 'solicitante']), addNewSopi);
router.put('/',  hasProfile(['director', 'referente']), verifyUpdateStatusPermissions(),  updateSopi);

// Centro de costo
router.get('/centroCosto', getAllCostCenter);

// Financiamiento
router.get('/financiamiento', getAllFinancing);
router.get('/:sopiId', sopiDetailPermission() ,getSopi);


module.exports = router;