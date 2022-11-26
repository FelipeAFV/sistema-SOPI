const {Router} = require('express')
const {AuthController} = require('./auth-controller');
const { hasPermission } = require('./check-auth-middleware');
const { getUserPermissions } = require('./permissions-controller');
const {getAllProfile} = require('./profile-controller');
const { addUser } = require('./user-controller');

const router = Router();

// router.post('/registrarse', AuthController.addUser);
router.post('/ingresar', AuthController.loginUser);
router.post('/verify', AuthController.userData);
router.get('/logout', AuthController.logOutUser);
router.get('/perfiles', getAllProfile);
router.post('/usuarios', hasPermission(['USUARIO_INGRESAR']),AuthController.addUser);
router.get('/usuarios', AuthController.getManagerUsers);
router.get('/usuarios/permisos', getUserPermissions);
router.get('/usuarios/:userId/permisos', getUserPermissions);
router.post('/usuarios/editar',AuthController.userUpdateData);
router.post('/usuarios/:userId/editar' ,hasPermission(['USUARIO_EDITAR']),AuthController.userUpdateData);
router.post('/usuarios/:userId/accesos', AuthController.getUserAccesses);




module.exports = router;