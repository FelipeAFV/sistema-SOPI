const { Manager } = require("../../management/domain/models");
const { Purchase, PurchaseDetail, PurchaseStatus } = require("./models")


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
<<<<<<< HEAD
        include: [{model:PurchaseDetail}, {model:PurchaseStatus, as: 'status'}]
=======
        include: [PurchaseDetail, { model: PurchaseStatus, as: 'status'}]
>>>>>>> b1d3140a70df8b525fe22a7ee1ca9f7527580a64
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
    return await Purchase.findAll({ include: [{model: PurchaseStatus, as: 'status'}]});
}

const getAllPurchasesWithManager = async (managerId) => {
    return await Purchase.findAll({ include: [{model: Manager, where: {userId: managerId}}]});
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
exports.getPurchaseFromManagerId = getPurchaseFromManagerId;