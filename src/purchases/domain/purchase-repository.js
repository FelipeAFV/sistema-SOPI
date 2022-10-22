const { Purchase, PurchaseDetail } = require("./models")


const savePurchase = async (purchase) => {
    const purchaseSaved = await Purchase.create(purchase);
    return purchaseSaved

}

const getPurchaseById = async(purchaseId) => {
    const purchase = await Purchase.findOne({
        where: {
            id:purchaseId
        },
        include: PurchaseDetail
    })
    return purchase;
}

exports.savePurchase = savePurchase;
exports.getPurchaseById = getPurchaseById;