const { PurchaseSopi } = require("./models")


const savePurchaseSopi = async ({purchaseId, sopiId}) => {
    return await PurchaseSopi.create({purchaseId, sopiId});
    
}

exports.savePurchaseSopi = savePurchaseSopi;