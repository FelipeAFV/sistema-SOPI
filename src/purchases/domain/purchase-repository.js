const { Purchase, PurchaseDetail } = require("./models")


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

exports.savePurchase = savePurchase;
exports.getPurchaseById = getPurchaseById;
exports.updatePurchaseById = updatePurchaseById;