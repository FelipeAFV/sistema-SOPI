const { PurchaseStatus } = require("./models")

const findStatusByName = async (name) => {
    const estado = await PurchaseStatus.findOne({name})
    return estado;
}
const findAllStatuses = async () => {
    return await PurchaseStatus.findAll();
}

exports.findStatusByName = findStatusByName;
exports.findAllStatuses = findAllStatuses;