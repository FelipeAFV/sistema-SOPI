const {Router} = require('express')
const {AuthController} = require('../controllers/auth-controller')

const router = Router();

router.post('/registrarse', AuthController.addUser);
router.post('/ingresar', AuthController.loginUser);
router.get('/logout', AuthController.logOutUser)



module.exports = router;