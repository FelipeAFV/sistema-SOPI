const { hasProfile, hasPermission, hasAnyPermission } = require('../../auth/infraestructure/check-auth-middleware');
const { CategoryController} = require('./classification-controller');
const { getAllCostCenter, createCostCenter } = require('./costcenter-controller');
const { getAllFinancing, createFinancing, updateFinancing } = require('./financing-controller');
const { addNewSopi, getSopi, updateSopi, getAllSopi } = require('./sopi-controller');
const { verifyUpdateStatusPermissions, sopiDetailPermission } = require('./sopi-middleware');
const { getStatuses } = require('./sopistatus-controller');
const {SupplyController} = require('./supply-controller');

const Router = require('express').Router;

const router = Router();

// SOPI
router.get('/', hasAnyPermission(['SOPI_VER', 'SOPI_VER_CREADAS']),getAllSopi);
router.post('/', hasPermission(['SOPI_CREAR']), addNewSopi);
router.put('/', hasPermission(['SOPI_EDITAR']), updateSopi);
router.get('/', getAllSopi);
//routes for cost center
router.post('/centroCosto', createCostCenter );
//router.put('/centroCosto', updateCostCenter);
router.get('/centroCosto', getAllCostCenter);
//router.delete()


//router for financing
router.post('/financiamiento', createFinancing);
//router.put('/financiamiento', updateFinancing);
router.get('/financiamiento', getAllFinancing);
//router.delete();
//routes for supplies
router.post('/insumos', SupplyController.createSupply);
router.get('/insumos', SupplyController.getSupplies);
router.put('/insumos', SupplyController.updateSupply);
router.delete('/insumos', SupplyController.deleteSupply);
//routes for classification
router.post('/insumos/clasificacion', CategoryController.createCategory); 
router.get('/insumos/clasificacion', CategoryController.getCategories);
router.put('/insumos/clasificacion', CategoryController.updateCategory);
router.delete('/insumos/clasificacion', CategoryController.deleteCategory);

// status
router.get('/estados', getStatuses);

router.get('/:sopiId', sopiDetailPermission() , getSopi);






module.exports = router;