const { Sopi, SopiDetail, SopiStatus } = require("./models")

const getSopiById =  async (id) => {
    const sopi = await Sopi.findOne({where: { id: id}, include: SopiDetail})
    return sopi;
}

const getAllSopis = async () => {
    const sopis = await Sopi.findAll();
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

exports.getSopiById = getSopiById;
exports.findSopi = findSopi;
exports.saveSopi = saveSopi;
exports.updateSopi = updateSopi;
exports.getAllSopis = getAllSopis;