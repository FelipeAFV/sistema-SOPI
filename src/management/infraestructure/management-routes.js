const { Router } =  require('express');
const { uploadMiddleware } = require('../..');
const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { addDocument } = require('./document-controller');
const { addManager } = require('./manager-controller');
const { ticketCreation, getAllTickets } = require('./ticket-controller');




const router = Router();


router.post('/responsables', hasProfile(['jefe_compra','director']), addManager);
router.post('/documentos', uploadMiddleware.single('doc'), addDocument);
router.post('/ticket', ticketCreation);
//TODO: cambiar parametro a query
router.get('/ticket/:compraId', getAllTickets);


exports.managementRoutes = router;