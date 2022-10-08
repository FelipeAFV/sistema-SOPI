const { loadAllAssociations } = require('../../src/database/db-associate-models');
const { sequelize } = require('../../src/database/db-init');
const sopiController = require('../../src/solicitude/infraestructure/sopi-controller');
const { createSopi } = require('../../src/solicitude/application/sopi-service');

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

    try {

    } catch (e) {

        sequelize.transaction(async () => {


            const result = await createSopi({
                costCenterId: 42, financingId: 10, userId: 1, basis: 'Escases', items: [{
                    name: 'asd', features: 'asdas', quantity: 1
                }]
            })

            await expect(result).not.toBeNull()

            /**
             * Trow error for transaction to ROLLBACK
             */
            throw new Error('Error controlado')

        })
    }


});