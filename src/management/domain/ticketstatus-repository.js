const {TicketStatus} = require("./models");

const findAllStatus = async () => {
    return await TicketStatus.findAll();
};

const findStatusByName = async (statusName) => {
    return await TicketStatus.findOne({where: {name: statusName}});
}

exports.findAllStatus = findAllStatus;
exports.findStatusByName = findStatusByName;