const { SopiStatus, SopiLog } = require("./models")

const addLogEntryByStatusName = async (sopiId, userId, statusName) => {
    const status = await SopiStatus.findOne({where: {name: statusName}});

    const logEntry = await SopiLog.create({userId, sopiId, sopiStatusId: status.id})

    return logEntry;
}


exports.addLogEntryByStatusName = addLogEntryByStatusName;