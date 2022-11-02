const { loadAllAssociations } = require('../../src/database/db-associate-models');
const { sequelize } = require('../../src/database/db-init');

const { createSopi, updateSopiStatus } = require('../../src/solicitude/application/sopi-service');
const { findSopi, getAllSopis } = require('../../src/solicitude/domain/sopi-repository');
const { getLogEntriesBySopiId } = require('../../src/solicitude/domain/sopilog-repository');
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



test('Ingreso de sopi', async () => {

        const sopiCreated = await createSopi({
            costCenterId: 1, financingId: 1 , userId: 3, basis: 'Wena', items: [{

                name: 'asd', features: 'asdas', quantity: 1
            }]
        })
        await expect(sopiCreated).not.toBeNull();

        const status = await  findStatusById(sopiCreated.statusId);

        await expect(status.name).toBe('INGRESADA')

        const statuses = await sopiCreated.getSopiLogStatus();

        await expect(statuses[0].name).toBe('INGRESADA');

});

test('Actualizacion de sopi', async () => {

    try {

        const sopis = await  getAllSopis();
        
        const newStatusId = 7;
        
        if (!sopis || sopis.length == 0) {
            throw new Error('Test no puede ser ejecutado sin sopis en BBDD');
        }
        const lastSopi = sopis.slice(-2)[0];
        const currentStatus = await lastSopi.getStatus();
        
        const sopiUpdated = await updateSopiStatus({sopiId: lastSopi.id, statusId: newStatusId, userId: 3, comment: 'Prueba de cambio de estado' })
        
        expect(sopiUpdated.statusId).toBe(newStatusId);
        
        const logEntries = await getLogEntriesBySopiId(lastSopi.id);
        
        const previousLog = logEntries.find( log => log.statusId == currentStatus.id);
        expect(previousLog).not.toBeNull();
        
        const lastLog = logEntries.find( log => log.statusId == newStatusId);
        expect(lastLog).not.toBeNull();

        expect(logEntries.slice(-1)[0].statusId).toBe(newStatusId);
        
        
    } catch (e) {
        console.log('Error en test ', e);
        throw new Error('Error en test')
    } 


});