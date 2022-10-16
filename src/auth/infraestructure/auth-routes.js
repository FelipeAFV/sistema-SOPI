const {Router} = require('express')
const {AuthController} = require('./auth-controller');
const { hasPermission } = require('./check-auth-middleware');
const {getAllProfile} = require('./profile-controller');
const { addUser } = require('./user-controller');

const router = Router();

// router.post('/registrarse', AuthController.addUser);
router.post('/ingresar', AuthController.loginUser);
router.get('/logout', AuthController.logOutUser);
router.get('/perfiles', getAllProfile);
router.post('/usuarios', hasPermission(['USUARIO_INGRESAR']),AuthController.addUser);



module.exports = router;