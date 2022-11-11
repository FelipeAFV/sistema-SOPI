const { findAllPermisionFromProfileId } = require("../../auth/domain/permission-repository");
const { sequelize } = require("../../database/db-init");
const { SopiLog, Sopi } = require("../domain/models");
const { saveSopi, updateSopi, findSopi, getAllSopis } = require("../domain/sopi-repository");
const { saveSopiDetail } = require("../domain/sopidetail-repository");
const { addLogEntryByStatusName, addLogEntryByStatusId } = require("../domain/sopilog-repository");
const { findStatusByName } = require("../domain/sopistatus-repository");


const generateSopiDetails = async (items, sopiId) => {


    const sopiDetails = [];
    for (let item of items) {

        if (item.supplyId) {
            console.log('asdasd')
            const sopiDetailCreated = await saveSopiDetail({ supplyId: item.supplyId, quantity: item.quantity })
            sopiDetails.push(sopiDetailCreated);
            return;
        }
        const { name, features, quantity } = item;

        if (!name || !features || !quantity) {
            throw new Error(`Datos faltantes para item ${JSON.stringify(item)}`);
        }
        const sopiDetailCreated = await saveSopiDetail({ name, features, quantity, sopiId });
        sopiDetails.push(sopiDetailCreated);
    }

    return sopiDetails;



}


const createSopiSeqTransactional = async ({ costCenterId, financingId, basis, userId, items }) => {

    try {
        console.log(items.length)
        if (!items || items.length == 0) {
            throw new Error('La sopi debe ser ingresada con detalles')
        }
        const response = await sequelize.transaction(async (t) => {

            const status = await findStatusByName('INGRESADA');

            let sopiCreated = await saveSopi({ costCenterId, financingId, basis: '', userId, statusId: status.id })
                .catch(e => { console.log(e); throw new Error('Centro de costo o financiamiento no existe') });

            sopiCreated = await updateSopi(sopiCreated.id, { basis: basis || null })
                .catch(e => { throw new Error('Fundamento debe existir') });

            await addLogEntryByStatusName(sopiCreated.id, userId, 'INGRESADA');
            console.log('A añadir entrada de logs')

            const details = await generateSopiDetails(items, sopiCreated.id);

            // for (let detail of details) {

            //     await sopiCreated.setSopiDetails(detail);
            // }


            return sopiCreated;
        });
        return response;

    } catch (e) {
        console.log(e)
        throw new Error(e.message);
    }

}


const updateSopiStatus = async ({ sopiId, statusId, userId, comment }) => {

    const sopiUpdated = await updateSopi(sopiId, { statusId: statusId });

    await addLogEntryByStatusId(sopiId, userId, comment, statusId);

    return sopiUpdated;
}


const getSopisFilteredByUserPermissions = async (profileId) => {
    const access = await findAllPermisionFromProfileId(profileId);
    const sopis = await getAllSopis();
    const sopiAccess = access.filter((access) => access.name.includes('SOPI_VER_ESTADO'));
    console.log(sopiAccess)

    const sopisFiltered = sopis.filter(sopi => {
        let permitted = false;
        console.log(sopi)
        for (let access of sopiAccess) {
            if (access.name.includes(sopi.status.name)) {
                permitted = true;
                break;
            }

        }
        return permitted;
    });
    return sopisFiltered;
}

exports.createSopi = createSopiSeqTransactional;
exports.updateSopiStatus = updateSopiStatus;
exports.getSopisFilteredByUserPermissions = getSopisFilteredByUserPermissions;