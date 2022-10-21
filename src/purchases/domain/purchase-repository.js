const { Purchase } = require("./models")


const savePurchase = async (purchase) => {
    const purchaseSaved = await Purchase.create(purchase);
    return purchaseSaved

}


exports.savePurchase = savePurchase;