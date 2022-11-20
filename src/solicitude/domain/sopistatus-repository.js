const { SopiStatus } = require("./models");

const findStatusByName = async (statusName) => {

    return await SopiStatus.findOne({where: {name: statusName}});
}
const findStatusById = async (id) => {

    return await SopiStatus.findOne({where: {id}});
}
const findAllStatus = async () => {
    return await SopiStatus.findAll();
}

exports.findStatusByName = findStatusByName;
exports.findStatusById = findStatusById;
exports.findAllStatus = findAllStatus;