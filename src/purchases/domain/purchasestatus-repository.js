const { PurchaseStatus } = require("./models")

const findStatusByName = async (name) => {
    const estado = await PurchaseStatus.findOne({name})
    return estado;
}


exports.findStatusByName = findStatusByName;