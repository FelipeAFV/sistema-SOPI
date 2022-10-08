const { loadAllAssociations } = require('../../src/database/db-associate-models');
const { sequelize } = require('../../src/database/db-init');
const sopiController = require('../../src/solicitudes/controllers/sopi-controller');
const { createSopi } = require('../../src/solicitudes/services/sopi-service');

/**
 * Provide mock sequelize and add transaction scope
 */
jest.mock('sequelize', () => {
    const sequelize = jest.requireActual('sequelize');
    const cls = require('cls-hooked');
    const namespace = cls.createNamespace('test-namespace-2');
    sequelize.useCLS(namespace);
    return sequelize;
})

beforeEach(async () => {
    loadAllAssociations();
    // transaction = await sequelize.transaction();
    // console.log(transaction);
})

afterAll(async () => {
    // await transaction.rollback();
    await sequelize.close();
})



test('Servicio para ingreso de sopi', async () => {

   


        const result = await createSopi({costCenterId: 1, financingId: 1, userId: 1, basis: 'Escases'})

        await expect(result).not.toBeNull()

        /**
         * Trow error for transaction to ROLLBACK
         */



});