const { hasProfile, hasPermission } = require('../../auth/infraestructure/check-auth-middleware');
const { CategoryController} = require('./classification-controller');
const { getAllCostCenter } = require('./costcenter-controller');
const { getAllFinancing } = require('./financing-controller');
const { addNewSopi, getSopi, updateSopi, getAllSopi } = require('./sopi-controller');
const { verifyUpdateStatusPermissions, sopiDetailPermission } = require('./sopi-middleware');
const {SupplyController} = require('./supply-controller');

const Router = require('express').Router;

const router = Router();

// SOPI
router.get('/', getAllSopi);
router.post('/', hasPermission(['SOPI_CREAR']), addNewSopi);
router.put('/', hasPermission(['SOPI_EDITAR']), updateSopi);
router.get('/', getAllSopi);
router.get('/centroCosto', getAllCostCenter);
router.get('/financiamiento', getAllFinancing);
//routes for supplies
router.post('/insumos', SupplyController.createSupply);
router.get('/insumos', SupplyController.getSupplies);
//routes for classification
router.post('/insumos/clasificacion', CategoryController.createCategory); 
router.get('/insumos/clasificacion', CategoryController.getCategories);
router.get('/:sopiId', sopiDetailPermission() , getSopi);






module.exports = router;