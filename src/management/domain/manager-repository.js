const { Manager } = require("./models")

const saveManager = async ({userId, purchaseId}) => {
    const manager = await Manager.create({userId, purchaseId});
    return manager

}

const findManagerPurchase = async (userId) => {
    const result = await Manager.findAll({where:{userId}})
    if(!result){
        return null
    }
    return result;
}

exports.findManagerPurchase = findManagerPurchase;

exports.saveManager = saveManager;