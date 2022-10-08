const { sequelize } = require("../../database/db-init");
const { Sopi, SopiDetail } = require("../domain/models")


const insertSopiDetails = async (items, sopiId) => {


    const sopiDetails = [];
    for (let item of items) {

        if (item.supplyId) {

            const sopiDetailCreated = await SopiDetail.create({ supplyId: item.supplyId, quantity: item.quantity })
            sopiDetails.push(sopiDetailCreated);
            return;
        }
        const { name, features, quantity } = item;

        if (!name || !features || !quantity) {
            throw new Error(`Datos faltantes para item ${JSON.stringify(item)}`);
        }
        const sopiDetailCreated = await SopiDetail.create({ name, features, quantity });
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


            let sopiCreated = await Sopi.create({ costCenterId, financingId, basis: '', userId })
                .catch(e => { throw new Error('Centro de costo o financiamiento no existe') });

            sopiCreated = await sopiCreated.update({ basis: basis || null })
                .catch(e => { throw new Error('Fundamento debe existir') });

            const details = await insertSopiDetails(items);

            for (let detail of details) {

                await sopiCreated.setSopiDetails(detail);
            }


            return sopiCreated;
        });
        return response;

    } catch (e) {

        throw new Error(e.message);
    }

}



exports.createSopi = createSopiSeqTransactional;