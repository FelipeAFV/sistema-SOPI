const docService = require('../application/document-service')
const { sendHttpResponse } = require("../../share/utils/response-parser");
const { findDocument } = require('../domain/document-repository');
const fs = require('fs')

const addDocument = async (req, res) => {
    console.log(req.file);

    const {purchaseId} = req.body;
    const docStored = await docService.addDocument({file: req.file, purchaseId})
    // console.log(req.files[0]);
    // console.log(req.files[0].name);
    // console.log(req.files[0].type);
    sendHttpResponse(res, docStored, 200)

}

const getDocument = async (req, res) => {
    const {docId} = req.params;

    try {
        const doc = await findDocument(docId)
    
        if (!doc) {
            sendHttpResponse(res, 'Documento no encontrado', 400)
            return;
        }
        fs.readFile(doc.path, (err, data) => {
            if (err) {
                res.end(data)
                return
            }
            res.end(data)
            return;
            // sendHttpResponse(res, data, 200)
        })
        
    } catch (e) {
        sendHttpResponse(res, 'Error', 500, 'Error al buscar documento');
        return;
        
    }
}

exports.addDocument = addDocument;
exports.getDocument = getDocument;