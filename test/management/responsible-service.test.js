const { loadAllAssociations } = require('../../src/database/db-associate-models');
const { sequelize } = require('../../src/database/db-init');
const { addManagerForSopi } = require('../../src/management/application/responsible-service');




/**
 * Provide mock sequelize and add transaction scope
 */

 jest.mock('sequelize', () => {
    const sequelize = jest.requireActual('sequelize');
    const cls = require('cls-hooked');
    const namespace = cls.createNamespace('test-namespace-4');
    sequelize.useCLS(namespace);
    return sequelize;
});

beforeEach(async () => {
    loadAllAssociations();
    // transaction = await sequelize.transaction();
    // console.log(transaction);
})

afterAll(async () => {
    // await transaction.rollback();
    await sequelize.close();
})

test('ingreso de responsable', async ()=> {
    try {
        console.log("******Ingreso de manager*****");

        
        const addM = await addManagerForSopi({managerId: 4, purchaseId:1});

        await expect(addM).toBeNull();
       
    } catch (error) {
        console.log('Error en el test', error);
    }
})