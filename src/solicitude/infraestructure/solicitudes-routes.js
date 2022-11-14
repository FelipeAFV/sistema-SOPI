const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { CategoryController} = require('./classification-controller');
const { getAllCostCenter } = require('./costcenter-controller');
const { getAllFinancing } = require('./financing-controller');
const { addNewSopi, getSopi, updateSopi, getAllSopi } = require('./sopi-controller');
const { verifyUpdateStatusPermissions, sopiDetailPermission } = require('./sopi-middleware');
const {SupplyController} = require('./supply-controller');

const Router = require('express').Router;

const router = Router();

router.post('/', hasProfile(['director', 'solicitante']), addNewSopi);
router.put('/',  hasProfile(['director', 'referente']), verifyUpdateStatusPermissions(),  updateSopi);
router.get('/', getAllSopi);
//routes for cost centers
router.get('/centroCosto', getAllCostCenter);
//routes for financing
router.get('/financiamiento', getAllFinancing);
//routes for supplies
router.post('/insumos', SupplyController.createSupply);
router.get('/insumos', SupplyController.getSupplies);
//routes for classification
router.post('/insumos/clasificacion', CategoryController.createCategory); 
router.get('/:sopiId', sopiDetailPermission() ,getSopi);






module.exports = router;