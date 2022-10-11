const { SopiStatus } = require("./models");

const findStatusByName = async (statusName) => {

    return await SopiStatus.findOne({where: {name: statusName}});
}
const findStatusById = async (id) => {

    return await SopiStatus.findOne({where: {id}});
}

exports.findStatusByName = findStatusByName;
exports.findStatusById = findStatusById;