const { Manager, Ticket } = require("../../management/domain/models");
const { SopiDetail, Supplies } = require("../../solicitude/domain/models");
const { Purchase, PurchaseDetail, PurchaseStatus, Supplier, PurchaseType } = require("./models")


const savePurchase = async (purchase) => {
    const purchaseSaved = await Purchase.create(purchase);
    return purchaseSaved

};

const getPurchase = async(conditions) => {
    const purchase = await Purchase.findOne({
        where:conditions,
        include: [{model: PurchaseStatus, as: 'status'}]
    });
    return purchase;
};

const getPurchaseById = async(purchaseId) => {
    const purchase = await Purchase.findOne({
        where: {
            id:purchaseId
        },
        include: [{model:PurchaseDetail, include: [{model: SopiDetail, include: Supplies}]}, {model:PurchaseStatus, as: 'status'}]
    })
    return purchase;
};

const updatePurchaseById = async (id, purchase) => {
    const purchaseToUpdate = await Purchase.findOne({
        where: {
            id
        }
    })
    return await purchaseToUpdate.update(purchase);
}

const getAllPurchases = async () => {
    return await Purchase.findAll({ include: [{model: PurchaseStatus, as: 'status'}, {model: Supplier}, {model: PurchaseType}]});
}

const getAllPurchasesWithManager = async (managerId) => {
    return await Purchase.findAll({ include: [{model: Manager, where: {userId: managerId}}]});
}
const getPurchaseWithManager = async (managerId, purchaseId) => {
    return await Purchase.findOne({ where: {id: purchaseId} ,include: [{model: Manager, where: {userId: managerId}}]});
}

const getPurchaseWithUserTickets = async (userId, purchaseId) => {

    return await Purchase.findOne({where: {id:purchaseId},include:[{model: Ticket, where: {userId: userId}}]});
}

const getPurchaseFromManagerId = async(purchaseId, managerId) => {
    return await Purchase.findOne({where: {id:purchaseId},include:[{model: Manager, where: {userId: managerId}}]});
}

exports.savePurchase = savePurchase;
exports.getPurchaseById = getPurchaseById;
exports.updatePurchaseById = updatePurchaseById;
exports.getAllPurchases = getAllPurchases;
exports.getAllPurchasesWithManager = getAllPurchasesWithManager;
exports.getPurchase = getPurchase;
exports.getPurchaseWithManager = getPurchaseWithManager;
exports.getPurchaseFromManagerId = getPurchaseFromManagerId;
exports.getPurchaseWithUserTickets = getPurchaseWithUserTickets;
