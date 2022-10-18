const { Purchase } = require("./models")


const savePurchase = async (purchase) => {
    const purchase = await Purchase.create(purchase);

}

exports.savePurchase = savePurchase;