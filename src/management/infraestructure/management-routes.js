const { Router } =  require('express');
const { uploadMiddleware } = require('../..');
const { hasProfile } = require('../../auth/infraestructure/check-auth-middleware');
const { addDocument, getDocument, getDocuments, deleteDoc } = require('./document-controller');
const { addManager } = require('./manager-controller');
const { ticketCreation, getTickets, getTicket, updateTicket } = require('./ticket-controller');




const router = Router();


router.post('/responsables', hasProfile(['jefe_compra','director']), addManager);
router.post('/documentos', uploadMiddleware.single('doc'), addDocument);
router.get('/documentos',  getDocuments);
router.delete('/documentos', deleteDoc);
router.post('/ticket', ticketCreation);
//TODO: cambiar parametro a query
router.get('/ticket', getTickets);
router.get('/ticket/:ticketId', getTicket);
router.get('/documentos/:docId',  getDocument);
router.put('/ticket', updateTicket);


exports.managementRoutes = router;