const { where } = require("sequelize");
const { Purchase } = require("../../purchases/domain/models");
const { Document, Manager } = require("./models");


const saveDocument = async ({purchaseId, type, name, path}) => {

    const doc = await Document.create({purchaseId, type, name, path});

    return doc;
}

const findDocument = async (docId) => {
    return await Document.findOne({where: {id: docId}})

}

const findDocsWithCondition = async (conditions) => {

    return await Document.findAll({ where: conditions})
}

const removeDocument = async (docId) => {
    return await Document.destroy({ where: {id: docId}})
}

const findDocFromManagerPurchase = async (managerId) => {
    return await Document.findAll({ include: [{model: Purchase, required: true, include: [{ model: Manager,
        required: true,
     where: { userId: managerId } }]}]});
}

const findDocFromManagerPurchaseAndDocId = async (managerId, docId) => {
    return await Document.findOne({ where: {id: docId} ,include: [{model: Purchase, required: true, include: [{ model: Manager,
        required: true,
     where: { userId: managerId } }]}]});
}

exports.saveDocument = saveDocument;
exports.findDocument = findDocument;
exports.findDocsWithCondition = findDocsWithCondition;
exports.removeDocument = removeDocument;
exports.findDocFromManagerPurchase = findDocFromManagerPurchase;
exports.findDocFromManagerPurchaseAndDocId = findDocFromManagerPurchaseAndDocId