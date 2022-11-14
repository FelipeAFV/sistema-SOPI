const { Document } = require("./models");


const saveDocument = async ({purchaseId, type, name, path}) => {

    const doc = await Document.create({purchaseId, type, name, path});

    return doc;
}

const findDocument = async (docId) => {
    return await Document.findOne({where: {id: docId}})

}

exports.saveDocument = saveDocument;
exports.findDocument = findDocument;