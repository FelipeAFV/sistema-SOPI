const { sequelize } = require("../../database/db-init");
const { Sopi } = require("../models/models")


const createSopiSeqTransactional = async ({costCenterId, financingId, basis}) => {
    let t = null;
    try {
        t = await sequelize.transaction();
        let sopiCreated = await Sopi.create({costCenterId, financingId, basis: ''}, { transaction: t})
            .catch(e => {throw new Error('Centro de costo o financiamiento no existe')});

        sopiCreated = await sopiCreated.update({basis: basis || null}, {transaction: t})
            .catch(e => { throw new Error('Fundamento debe existir')});

            await t.commit()
        return sopiCreated;
    } catch (e) {
        t.rollback();
        throw new Error(e.message);
    }
    
}



exports.createSopi = createSopiSeqTransactional;