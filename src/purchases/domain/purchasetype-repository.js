const { PurchaseType } = require("./models")

const getAllPurchaseType = async () => {
    return await PurchaseType.findAll();
}

exports.getAllPurchaseType = getAllPurchaseType;