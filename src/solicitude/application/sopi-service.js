const { sequelize } = require("../../database/db-init");
const { SopiLog, Sopi } = require("../domain/models");
const { saveSopi, updateSopi, findSopi } = require("../domain/sopi-repository");
const { saveSopiDetail } = require("../domain/sopidetail-repository");
const { addLogEntryByStatusName, addLogEntryByStatusId } = require("../domain/sopilog-repository");


const generateSopiDetails = async (items) => {


    const sopiDetails = [];
    for (let item of items) {

        if (item.supplyId) {

            const sopiDetailCreated = await saveSopiDetail({ supplyId: item.supplyId, quantity: item.quantity })
            sopiDetails.push(sopiDetailCreated);
            return;
        }
        const { name, features, quantity } = item;

        if (!name || !features || !quantity) {
            throw new Error(`Datos faltantes para item ${JSON.stringify(item)}`);
        }
        const sopiDetailCreated = await saveSopiDetail({ name, features, quantity });
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
        const response = await sequelize.transaction(async () => {


            let sopiCreated = await saveSopi({ costCenterId, financingId, basis: '', userId })
            .catch(e => { throw new Error('Centro de costo o financiamiento no existe') });
            
            sopiCreated = await updateSopi( sopiCreated.id, { basis: basis || null })
            .catch(e => { throw new Error('Fundamento debe existir') });
            
            await addLogEntryByStatusName(sopiCreated.id, userId, 'INGRESADA');
            console.log('A añadir entrada de logs')

            const details = await generateSopiDetails(items);

            for (let detail of details) {

                await sopiCreated.setSopiDetails(detail);
            }


            return sopiCreated;
        });
        return response;

    } catch (e) {
        console.log(e)
        throw new Error(e.message);
    }

}


const updateSopiStatus = async ({sopiId, statusId, userId, comment}) => {

    const sopiUpdated = await updateSopi(sopiId, {statusId: statusId});

    await addLogEntryByStatusId(sopiId, userId, comment, statusId);

    return sopiUpdated;
}


exports.createSopi = createSopiSeqTransactional;
exports.updateSopiStatus = updateSopiStatus;