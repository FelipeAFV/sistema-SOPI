const docService = require('../application/document-service')
const { sendHttpResponse } = require("../../share/utils/response-parser");

const addDocument = async (req, res) => {
    console.log(req.file);

    const {purchaseId} = req.body;
    const docStored = await docService.addDocument({file: req.file, purchaseId})
    // console.log(req.files[0]);
    // console.log(req.files[0].name);
    // console.log(req.files[0].type);
    sendHttpResponse(res, docStored, 200)

}

exports.addDocument = addDocument;