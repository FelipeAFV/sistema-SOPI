const { SopiStatus, SopiLog } = require("./models")

const addLogEntryByStatusName = async (sopiId, userId, statusName) => {
    const status = await SopiStatus.findOne({where: {name: statusName}});
    const logEntry = await SopiLog.create({userId, sopiId, statusId: status.id})
    return logEntry;
}

const addLogEntryByStatusId = async (sopiId, userId, comment, statusId) => {

    const logEntry = await SopiLog.create({userId, sopiId, sopiStatusId: statusId, comment: comment})

    return logEntry;
}

const getLogEntriesBySopiId = async (sopiId) => {
    const sopiLogs = await SopiLog.findAll({ where: { sopiId}, order: [['statusId','ASC']]});
    return sopiLogs
}


exports.addLogEntryByStatusName = addLogEntryByStatusName;
exports.addLogEntryByStatusId = addLogEntryByStatusId;
exports.getLogEntriesBySopiId = getLogEntriesBySopiId;