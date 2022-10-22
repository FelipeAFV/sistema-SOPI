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
    if(result.length === 0){
        
        throw new Error('usuario no tiene asignado ningun proceso de compra')
    }
    return result;
}

const findAllManager = async () => {
    const result = await Manager.findAll()
    if(!result){
        throw new Error('No hay managers asignados hasta el momento')
    }
    return result;
}

exports.findManagerPurchase = findManagerPurchase;
exports.findAllManager = findAllManager;

exports.findManager = findManager;
exports.saveManager = saveManager;