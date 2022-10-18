const { loadAllAssociations } = require('../../src/database/db-associate-models');
const { sequelize } = require('../../src/database/db-init');
const { createPurchaseFromCompleteSopi } = require('../../src/purchases/application/purchase-service');
const { getAllSopis } = require('../../src/solicitude/domain/sopi-repository');

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



test('ingreso de compra', async () => {
    try {

        // await sequelize.transaction(async () => {
        const sopis = await getAllSopis();
        console.log(sopis)
        console.log('Ultima sopi',sopis.slice(-1)[0].id)

        const purchaseCreated = await createPurchaseFromCompleteSopi({ sopiId: sopis.slice(-1)[0].id })
        await expect(purchaseCreated).not.toBeNull();


        // })

    } catch (e) {
        console.log('Error en test');
    }



});