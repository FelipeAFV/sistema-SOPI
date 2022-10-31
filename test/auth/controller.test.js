
const { AuthController } = require('../../src/auth/infraestructure/auth-controller');
const { userRepository } = require('../../src/auth/domain/user-repository');
const { loadAllAssociations } = require('../../src/database/db-associate-models');
const { sequelize } = require('../../src/database/db-init');

/**
 * Provide mock sequelize and add transaction scope
 */
jest.mock('sequelize', () => {
    const sequelize = jest.requireActual('sequelize');
    const cls = require('cls-hooked');
    const namespace = cls.createNamespace('test-namespace');
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



test('Ingreso de usuario con perfil que no existe', async () => {


    await sequelize.transaction(async () => {


        const req = {};
        req.body = {
            username: 'felipe',
            password: '123456',
            profile: 'perfil_que_no_existe'
        }
        const res = {};
        res.cookie = (name, cookie) => {
            return;
        }
        res.status = (status) => {
            return res;
        }
        res.json = (message) => {
            return res;
        }

        const result = await AuthController.addUser(req, res);

        const user = await userRepository.findUserByUsername(req.body.username)
        console.log(res.json())
        await expect(user).toBeNull();

        /**
         * Trow error for transaction to ROLLBACK
         */


    })


});