const { SopiStatus, SopiLog } = require("./models")

const addLogEntryByStatusName = async (sopiId, userId, statusName) => {
    const status = await SopiStatus.findOne({where: {name: statusName}});

    const logEntry = await SopiLog.create({userId, sopiId, sopiStatusId: status.id})

    return logEntry;
}

const addLogEntryByStatusId = async (sopiId, userId, comment, statusId) => {

    const logEntry = await SopiLog.create({userId, sopiId, sopiStatusId: statusId})

    return logEntry;
}


exports.addLogEntryByStatusName = addLogEntryByStatusName;
exports.addLogEntryByStatusId = addLogEntryByStatusId;