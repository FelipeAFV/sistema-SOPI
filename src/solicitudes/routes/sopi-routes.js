const { addNewSopi } = require('../controllers/sopi-controller');

const Router = require('express').Router;

const router = Router();

router.post('/', addNewSopi)


module.exports = router;