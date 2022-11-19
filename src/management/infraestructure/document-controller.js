const docService = require('../application/document-service')
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findDocument } = require('../domain/document-repository');
const fs = require('fs');
const { PermissionError } = require('../../share/models/errors');
const { findPurchasesFilteredByPermissions } = require('../../purchases/application/purchase-service');
const { getPurchaseById } = require('../../purchases/domain/purchase-repository');

const addDocument = async (req, res) => {
    console.log(req.file);

    const { purchaseId } = req.body;
    const docStored = await docService.addDocument({ file: req.file, purchaseId })
    // console.log(req.files[0]);
    // console.log(req.files[0].name);
    // console.log(req.files[0].type);
    sendHttpResponse(res, docStored, 200)

}

const getDocument = async (req, res) => {
    const { docId } = req.params;

    try {
        const doc = await docService.findDocumentWithPermissions(docId, req.user.id, req.user.profileId);

        if (!doc) {
            sendHttpResponse(res, 'Documento no encontrado', 400)
            return;
        }
        fs.readFile(doc.path, (err, data) => {
            if (err) {
                res.end(data)
                return
            }
            res.status(200).end(data)
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

    try {
        const docs = await docService.findDocsFromCompraWithPermissions(compraId, req.user.id, req.user.profileId);
        sendHttpResponse(res, docs, 200)

    } catch (e) {
        if (e instanceof PermissionError) {

            sendHttpResponse(res, 'Error', 403, e.message)
            return;
        }
        sendHttpResponse(res, 'Error', 500);
        console.log(e)
    }

}

exports.addDocument = addDocument;
exports.getDocument = getDocument;
exports.getDocuments = getDocuments;