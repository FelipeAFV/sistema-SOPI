const { User } = require("../../auth/domain/models");
const { Purchase } = require("../../purchases/domain/models");
const { Manager } = require("./models")

const saveManager = async ({userId, purchaseId}) => {
    const manager = await Manager.create({userId, purchaseId});
    return manager
    
}

const findManager = async ({managerId, purchaseId}) => {
    const manager = await Manager.findOne({where:{userId: managerId, purchaseId:purchaseId}});
    return manager;

}

const findOneManager = async (managerId) => {
    const manager = await Manager.findOne({where:{id: managerId}});
    return manager;

}

const findManagerPurchase = async (userId) => {
    const result = await Manager.findAll({where:{userId},include:Purchase})
    if(result.length === 0){
        
        throw new Error('usuario no tiene asignado ningun proceso de compra')
    }
    
    return result;
}

const findAllManager = async () => {
    const result = await Manager.findAll({include: [Purchase, User]})
    if(!result){
        throw new Error('No hay managers asignados hasta el momento')
    }
    return result;
}

const findAllManagers = async (id) => {
    const managers = await Manager.findAll({where:{purchaseId:id}});
    if(!managers){
        throw new Error('No hay managers asociados a la compra')
    }
    return managers;
}

exports.findManagerPurchase = findManagerPurchase;
exports.findAllManager = findAllManager;
exports.findAllManagers = findAllManagers;

exports.findManager = findManager;
exports.saveManager = saveManager;
exports.findOneManager = findOneManager;