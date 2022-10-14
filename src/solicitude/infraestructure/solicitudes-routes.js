const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { getAllCostCenter } = require('./costcenter-controller');
const { getAllFinancing } = require('./financing-controller');
const { addNewSopi, getSopi, updateSopi, getAllSopi } = require('./sopi-controller');
const { verifyUpdateStatusPermissions } = require('./updatesopi-middleware');

const Router = require('express').Router;

const router = Router();

router.post('/', hasProfile(['admin', 'solicitante']), addNewSopi);
router.put('/',  hasProfile(['admin', 'referente']), verifyUpdateStatusPermissions(),  updateSopi);
router.get('/', getAllSopi);
router.get('/:sopiId', getSopi);
router.get('/centroCosto', getAllCostCenter);
router.get('/financiamiento', getAllFinancing);


module.exports = router;