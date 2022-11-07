const { loadAllAssociations } = require('../../src/database/db-associate-models');
const { sequelize } = require('../../src/database/db-init');
const { addManagerForSopi } = require('../../src/management/application/responsible-service');
const {readFileSync, read} = require('fs');
const { addDocument } = require('../../src/management/infraestructure/document-controller');




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

test('ingreso de doc', async ()=> {
    try {
        const req = {};
        const res = {};

        res.end = () => {

        }

        const file = readFileSync('/Users/felipeafv/dev/node/workflow-docs/Portfolio.pdf')
        req.files = [file]

        const blob = new Blob([file])
        const fileObj = new File([file])
        console.log(typeof(fileObj))
        console.log('Blob', blob.name)


        addDocument(req,  res)
    } catch (error) {
        console.log('Error en el test', error);
    }
})