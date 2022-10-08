const { Sopi, SopiDetail } = require("./models")

const getSopiById =  async (id) => {
    const sopi = await Sopi.findOne({where: { id: id}, include: SopiDetail})
    return sopi;
}


exports.getSopiById = getSopiById;