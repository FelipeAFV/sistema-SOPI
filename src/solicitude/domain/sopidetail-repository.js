const { SopiDetail } = require("./models")

const saveSopiDetail =  async (sopiDetail) => {
    return await SopiDetail.create(sopiDetail);
}


exports.saveSopiDetail = saveSopiDetail;