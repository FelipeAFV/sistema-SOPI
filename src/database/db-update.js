
/**
 * Create database connection
 */
const { sequelize } = require('./db-init');
require('./db-associate-models').loadAllAssociations();



const updateOrCreateDatabase = async () => {

    try {
        await sequelize.sync({ alter: true })
    } catch (e) {
        console.log(e)
    }


    console.log('Rinning test query...');

};

updateOrCreateDatabase();
