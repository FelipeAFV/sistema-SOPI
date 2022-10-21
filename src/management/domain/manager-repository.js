const { Manager } = require("./models")

const saveManager = async ({userId, purchaseId}) => {
    const manager = await Manager.create({userId, purchaseId});
    return manager
}

exports.saveManager = saveManager;