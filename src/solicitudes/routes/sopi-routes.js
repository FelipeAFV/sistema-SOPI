const { getAllCostCenter } = require('../controllers/costcenter-controller');
const { getAllFinancing } = require('../controllers/financing-controller');
const { addNewSopi } = require('../controllers/sopi-controller');

const Router = require('express').Router;

const router = Router();

router.post('/', addNewSopi);
router.get('/centroCosto', getAllCostCenter);
router.get('/financiamiento', getAllFinancing);


module.exports = router;