const { Manager } = require("../../management/domain/models");
const { Purchase, PurchaseDetail, PurchaseStatus } = require("./models")


const savePurchase = async (purchase) => {
    const purchaseSaved = await Purchase.create(purchase);
    return purchaseSaved

};

const getPurchaseById = async(purchaseId) => {
    const purchase = await Purchase.findOne({
        where: {
            id:purchaseId
        },
        include: PurchaseDetail
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

exports.savePurchase = savePurchase;
exports.getPurchaseById = getPurchaseById;
exports.updatePurchaseById = updatePurchaseById;
exports.getAllPurchases = getAllPurchases;
exports.getAllPurchasesWithManager = getAllPurchasesWithManager;