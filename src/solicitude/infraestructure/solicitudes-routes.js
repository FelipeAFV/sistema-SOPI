const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { getAllCostCenter } = require('./costcenter-controller');
const { getAllFinancing } = require('./financing-controller');
const { addNewSopi, getSopi, updateSopi } = require('./sopi-controller');
const { verifyUpdatePermissions } = require('./updatesopi-middleware');

const Router = require('express').Router;

const router = Router();

router.post('/', hasProfile(['admin', 'solicitante']), addNewSopi);
router.put('/',  hasProfile(['admin', 'referente']), verifyUpdatePermissions(),  updateSopi);
router.get('/:sopiId', getSopi)
router.get('/centroCosto', getAllCostCenter);
router.get('/financiamiento', getAllFinancing);


module.exports = router;