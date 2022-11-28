const {Router} = require('express')
const {AuthController} = require('./auth-controller');
const { hasPermission } = require('./check-auth-middleware');
const { getUserPermissions } = require('./permissions-controller');
const {getAllProfile, getProfileAccesses} = require('./profile-controller');
const { addUser } = require('./user-controller');

const router = Router();

// router.post('/registrarse', AuthController.addUser);
router.post('/ingresar', AuthController.loginUser);
router.post('/verify', AuthController.userData);
router.get('/logout', AuthController.logOutUser);
router.get('/perfiles', getAllProfile);
router.get('/perfiles/:profileId', getAllProfile);
router.get('/permisos', AuthController.allPermissions);
router.post('/usuarios', hasPermission(['USUARIO_INGRESAR']),AuthController.addUser);
router.get('/usuarios', hasPermission(['USUARIO_VER']),AuthController.getAllUsers);
router.get('/usuarios/permisos', getUserPermissions);
router.get('/usuarios/:userId/permisos', getUserPermissions);
router.put('/usuarios',AuthController.userUpdateData);
router.get('/usuarios/:userId', AuthController.getAllUsers);
router.put('/usuarios/:userId' ,hasPermission(['USUARIO_EDITAR']),AuthController.userUpdateData);
router.get('/usuarios/:userId/accesos', AuthController.getUserAccesses);
router.put('/usuarios/:userId/accesos', hasPermission(['USUARIO_EDITAR']),AuthController.modifyAccesses);





module.exports = router;