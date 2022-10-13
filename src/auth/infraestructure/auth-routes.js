const {Router} = require('express')
const {AuthController} = require('./auth-controller')
const {getAllProfile} = require('./profile-controller')

const router = Router();

router.post('/registrarse', AuthController.addUser);
router.post('/ingresar', AuthController.loginUser);
router.get('/logout', AuthController.logOutUser);
router.get('/profiles', getAllProfile);



module.exports = router;