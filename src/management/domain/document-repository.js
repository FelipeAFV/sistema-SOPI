const { Document } = require("./models");


const saveDocument = async ({purchaseId, type, name, path}) => {

    const doc = await Document.create({purchaseId, type, name, path});

    return doc;
}

exports.saveDocument = saveDocument;