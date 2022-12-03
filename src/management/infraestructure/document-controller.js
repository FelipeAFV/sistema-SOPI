const docService = require('../application/document-service')
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findDocument, findDocFromManagerPurchase, findDocFromManagerPurchaseAndDocId, findDocsWithCondition } = require('../domain/document-repository');
const fs = require('fs');
const { PermissionError } = require('../../share/models/errors');
const { findPurchasesFilteredByPermissions } = require('../../purchases/application/purchase-service');
const { getPurchaseById, getPurchaseWithManager, getPurchaseWithUserTickets } = require('../../purchases/domain/purchase-repository');

const { findAllPermissionsFromUserAndProfile } = require('../../auth/domain/permission-repository');
const { findManagerFromPurchaseDocument, findManager } = require('../domain/manager-repository');

const addDocument = async (req, res) => {
    console.log(req.file);
    try {
        const { purchaseId } = req.body;

        const managerOfPurchase = await findManager({ managerId: req.user.id, purchaseId });
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);

        if (!managerOfPurchase && !permissions.find(p => p.name == 'DOC_CREAR')) {
            sendHttpResponse(res, 'Error', 403, 'No tienes permisos para crear documento')
            return
        }


        const docStored = await docService.addDocument({ file: req.file, purchaseId })
        // console.log(req.files[0]);
        // console.log(req.files[0].name);
        // console.log(req.files[0].type);
        sendHttpResponse(res, docStored, 200)
        return;
    } catch (e) {
        sendHttpResponse(res, 'Error', 500)
        console.log(e)
        return;
    }

}

const getDocument = async (req, res) => {
    const { docId } = req.params;

    try {

        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);

        const isDocAssignedToUser = await findDocFromManagerPurchaseAndDocId(req.user.id, docId);

        //TODO: chequear por usuario que tiene ticket asociado a la compra

        if (!permissions.find(p => p.name == 'DOC_VER') && !isDocAssignedToUser) {
            sendHttpResponse(res, 'Error', 403, 'No tienes permisos para buscar documento')
            return;
        }

        const doc = await findDocument(docId);

        // const doc = await docService.findDocumentWithPermissions(docId, req.user.id, req.user.profileId);
        if (!doc) {
            sendHttpResponse(res, 'Documento no encontrado', 400)
            return;
        }
        fs.readFile(doc.path, (err, data) => {
            if (err) {
                res.end(data)
                return
            }
            res.status(200).json({data: data, doc})
            return;
            // sendHttpResponse(res, data, 200)
        })

    } catch (e) {
        console.log(e.permissionFailed)
        sendHttpResponse(res, 'Error', 400, e);
        return;

    }
}

const getDocuments = async (req, res) => {
    const { compraId } = req.query;
    if (!compraId) {
        sendHttpResponse(res, 'Error', 400, 'Los documentos deben ser buscados por id de compra');
        console.log('aksjdjalkd')
        return;

    }
    if (!await getPurchaseById(compraId)) {
        sendHttpResponse(res, 'Error', 400, `No existe la compra con id ${compraId}`);
        return;

    }

    const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);

    //TODO: chequear por usuario que tiene ticket asociado a la compra

    const purchaseManaged = await getPurchaseWithManager(req.user.id, compraId);
    const purchaseTicket = await getPurchaseWithUserTickets(req.user.id, compraId);



    if (permissions.find(p => p.name == 'DOC_VER') || purchaseManaged || purchaseTicket) {    
        try {
            // const docs = await docService.findDocsFromCompraWithPermissions(compraId, req.user.id, req.user.profileId);
            const docs = await findDocsWithCondition({purchaseId: compraId});
            sendHttpResponse(res, docs, 200)
            
        } catch (e) {
            if (e instanceof PermissionError) {
                
                sendHttpResponse(res, 'Error', 403, e.message)
                return;
            }
            sendHttpResponse(res, 'Error', 500);
            console.log(e)
        }
        
    } else {
        sendHttpResponse(res, 'Error', 403, 'No tienes permisos para buscar documento')
        return;
    }
}


const deleteDoc = async (req, res) => {
    try {
        const permissions = await findAllPermissionsFromUserAndProfile(req.user.id, req.user.profileId);

        if (!req.body.docId) {
            sendHttpResponse(res, 'Error', 400, 'Debes enviar el id del documento')
            return;
        }

        const isDocAssignedToUser = await findDocFromManagerPurchaseAndDocId(req.user.id, req.body.docId);

        if (!permissions.find(p => p.name == 'DOC_ELIMINAR') && !isDocAssignedToUser) {
            sendHttpResponse(res, 'Error', 403, 'No tienes permisos para eliminar documento')
            return;
        }

        const result = await docService.removeDoc(req.body.docId);
        if (result) {

            sendHttpResponse(res, 'Documento eliminado', 200)
            return
        }
        sendHttpResponse(res, 'Error', 400)
        return
    } catch (e) {
        sendHttpResponse(res, 'Error', 500)
        console.log(e)
        return

    }
}
exports.addDocument = addDocument;
exports.getDocument = getDocument;
exports.getDocuments = getDocuments;
exports.deleteDoc = deleteDoc;