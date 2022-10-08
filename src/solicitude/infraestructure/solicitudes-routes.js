const { getAllCostCenter } = require('./costcenter-controller');
const { getAllFinancing } = require('./financing-controller');
const { addNewSopi, getSopi } = require('./sopi-controller');

const Router = require('express').Router;

const router = Router();

router.post('/', addNewSopi);
router.get('/:sopiId', getSopi)
router.get('/centroCosto', getAllCostCenter);
router.get('/financiamiento', getAllFinancing);


module.exports = router;