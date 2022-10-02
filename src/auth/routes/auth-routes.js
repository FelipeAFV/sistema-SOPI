const {Router} = require('express')
const {AuthController} = require('../controllers/auth-controller')

const router = Router();

router.post('/registrarse', AuthController.addUser);


module.exports = router;