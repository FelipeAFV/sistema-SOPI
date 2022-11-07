const { Router } =  require('express');
const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { addManager } = require('./manager-controller');
const { ticketCreation } = require('./ticket-controller');


const router = Router();


router.post('/responsables', hasProfile(['jefe_compra','director']), addManager);
router.post('/ticket', ticketCreation)


exports.managementRoutes = router;