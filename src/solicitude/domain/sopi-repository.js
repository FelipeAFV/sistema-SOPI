const { Manager } = require("../../management/domain/models");
const { Purchase } = require("../../purchases/domain/models");
const { Sopi, SopiDetail, SopiStatus } = require("./models")

const getSopiById =  async (id) => {
    const sopi = await Sopi.findOne({where: { id: id}, include: [{model: SopiDetail}, {model: SopiStatus, as: 'status'}]})
    return sopi;
}

const getAllSopis = async () => {
    const sopis = await Sopi.findAll({include: [{model: SopiStatus, as: 'status'}]});
    return sopis
}

const getAllSopisByConditions = async (conditions) => {
    const sopis = await Sopi.findAll({include: [{model: SopiStatus, as: 'status'}], where: conditions});
    return sopis
    
}

const findSopi = async (conditions) => {


    const sopi = await  Sopi.findOne({
        where: conditions,
        include: [{model: SopiStatus, as: 'status'}, SopiDetail]
    })
    return sopi;
}

const saveSopi = async (sopi) => {
    return await Sopi.create(sopi)

}

const updateSopi = async (id, sopi) => {

    const sopiToUpdate = await  Sopi.findOne({where: {id}})


    return await sopiToUpdate.update(sopi)
}

const getSopiFromPurchaseManager = async (managerId) => {
    return await Sopi.findAll({ include: 
        [{ model: Purchase, required: true, through: {attributes: []},
            
            include: [ { model: Manager,  required: true, where: {userId: managerId}, attributes: ['userId']}]
        }]
    })
    // return await Sopi.findAll({ include: 
    //     [{ model: Purchase, 
    //         include: [ {model: Manager, required: true, where: {userId: managerId}}],
    //     }]
    // })
}

exports.getSopiById = getSopiById;
exports.findSopi = findSopi;
exports.saveSopi = saveSopi;
exports.updateSopi = updateSopi;
exports.getAllSopis = getAllSopis;
exports.getAllSopisByConditions = getAllSopisByConditions;
exports.getSopiFromPurchaseManager = getSopiFromPurchaseManager;