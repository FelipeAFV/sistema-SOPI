const { Manager } = require("./models")

const saveManager = async ({userId, purchaseId}) => {
    const manager = await Manager.create({userId, purchaseId});
    return manager
    
}

const findManager = async ({userId, purchaseId}) => {
    const manager = await Manager.findOne({userId, purchaseId});
    return manager;

}

const findManagerPurchase = async (userId) => {
    const result = await Manager.findAll({where:{userId}})
    if(!result){
        return null
    }
    return result;
}

exports.findManagerPurchase = findManagerPurchase;

exports.findManager = findManager;
exports.saveManager = saveManager;