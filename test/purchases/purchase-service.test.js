const { loadAllAssociations } = require('../../src/database/db-associate-models');
const { sequelize } = require('../../src/database/db-init');
const { createPurchaseFromCompleteSopi, updatePurchaseStatus } = require('../../src/purchases/application/purchase-service');
const { getAllPurchases } = require('../../src/purchases/domain/purchase-repository');
const { getLogEntryByPurchaseId } = require('../../src/purchases/domain/purchaselog-repository');
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



test('Ingreso de compra', async () => {
    try {

        // await sequelize.transaction(async () => {
        const sopis = await getAllSopis();
        const ultimaSopi = sopis.slice(-1)[0];

        const purchaseCreated = await createPurchaseFromCompleteSopi({ sopiId: ultimaSopi.id })
        await expect(purchaseCreated).not.toBeNull();

        const sopiDetails = await ultimaSopi.getSopiDetails()

        purchaseCreated.items.forEach(async (item) => {
            const detail = sopiDetails.find((detail) => detail.id = item.sopiDetailId)
            await expect(detail).not.toBeNull();
        })



        // })

    } catch (e) {
        console.log('Error en test');
    }



});

test('Actualizacion de compra', async () => {
    try {

        // await sequelize.transaction(async () => {
        const purchases = await getAllPurchases();

        const newStatusId = 4;

        if (!purchases || purchases.length == 0) {
            throw new Error('Test no puede ser ejecutado sin sopis en BBDD');
        }
        const lastPurchase = purchases.slice(-1)[0];
        const currentStatus = await lastPurchase.getStatus();

        const purchaseUpdated = await updatePurchaseStatus({ userId: 3, purchaseId: lastPurchase.id, statusId: newStatusId, typeId: 1})

        expect(purchaseUpdated.statusId).toBe(newStatusId);

        const logEntries = await getLogEntryByPurchaseId(lastPurchase.id);

        const previousLog = logEntries.find(log => log.statusId == currentStatus.id);
        expect(previousLog).not.toBeNull();

        const lastLog = logEntries.find(log => log.statusId == newStatusId);
        expect(lastLog).not.toBeNull();
        // })

    } catch (e) {
        console.log('Error en test ', e);
        throw new Error('Error en test') 
    }



});