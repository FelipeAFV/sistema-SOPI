const { SopiStatus } = require("./models");

const findStatusByName = async (statusName) => {

    return await SopiStatus.findOne({where: {name: statusName}});
}

exports.findStatusByName = findStatusByName;