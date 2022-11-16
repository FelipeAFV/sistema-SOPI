const { SopiDetail } = require("./models")

const saveSopiDetail =  async (sopiDetail) => {
    return await SopiDetail.create(sopiDetail);
}

const getSopiDetailById = async(id) => {
    return await SopiDetail.findOne({
        where: {
            id
        }
    })
}

const getSopiDetailsById= async(id) => {
    return await SopiDetail.findAll({where:{id}});
}

exports.saveSopiDetail = saveSopiDetail;
exports.getSopiDetailById = getSopiDetailById;
exports.getSopiDetailsById = getSopiDetailsById;