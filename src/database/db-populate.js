const { sequelize } = require("./db-init");
const path = require('path')
const fs = require('fs')

const sql = fs.readFileSync(path.join(__dirname, '/populate.sql'), 'utf8');

try {
    const allStatements = sql.split('\n');
    allStatements.forEach(sqlStatement => {
        if (sqlStatement == '' || !sqlStatement) {
            return;
        }
        if (sqlStatement.includes(';')) {
            const subStatements = sqlStatement.split(';');
            subStatements.forEach(stat => {
                if (stat != '') {
                    sequelize.query(stat);
                }
            })
            
        } else {
            sequelize.query(sqlStatement);

        }
    });
    console.log(`SQL executed successfully`)

} catch (e) {
    console.log(`Error running query ${sql}`)
} 
