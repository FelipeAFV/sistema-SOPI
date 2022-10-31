const { loadAllAssociations } = require('../../src/database/db-associate-models');
const { sequelize } = require('../../src/database/db-init');

const { createSopi } = require('../../src/solicitude/application/sopi-service');
const { findSopi } = require('../../src/solicitude/domain/sopi-repository');
const { findStatusById } = require('../../src/solicitude/domain/sopistatus-repository');

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



test('ingreso de sopi', async () => {

        const sopiCreated = await createSopi({
            costCenterId: 1, financingId: 1 , userId: 3, basis: 'Wena', items: [{

                name: 'asd', features: 'asdas', quantity: 1
            }]
        })
        await expect(sopiCreated).not.toBeNull();

        const status = await  findStatusById(sopiCreated.statusId);

        await expect(status.name).toBe('INGRESADA')

        const statuses = await sopiCreated.getLogStatus();

        await expect(statuses[0].name).toBe('INGRESADA');

});