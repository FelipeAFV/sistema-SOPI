const { sequelize } = require("./db-init");
const path = require('path')
const fs = require('fs');
const { SopiStatus, Financing, CostCenter } = require("../solicitude/domain/models");
const { PurchaseStatus } = require("../purchases/domain/models");
const { Profile } = require("../auth/domain/models");

const sqlInsert = fs.readFileSync(path.join(__dirname, '/populate.sql'), 'utf8');

const sqlSelect = fs.readFileSync(path.join(__dirname, '/verification.sql'), 'utf8');

const populate = async () => {


    try {

        let selectStatements = sqlSelect.split('\n');
        selectStatements = selectStatements.map((el) => {
            if (el.trim() != '') {
                return el;
            }
        })

        for (let sql of selectStatements) {
            const [result, meta] = await sequelize.query(sql)
            if (result && result.length > 0) {
                return;
            }
        }

        const allStatements = sqlInsert.split('\n');
        allStatements.forEach(async (sqlStatement) => {
            if (sqlStatement == '' || !sqlStatement) {
                return;
            }
            if (sqlStatement.includes(';')) {
                const subStatements = sqlStatement.split(';');
                subStatements.forEach(async (stat) => {
                    if (stat != '') {
                        await sequelize.query(stat);
                    }
                })

            } else {
                await sequelize.query(sqlStatement);

            }
        });
        console.log(`SQL executed successfully`)

    } catch (e) {
        console.log(e)
        console.log(`Error running query ${sqlInsert}`)
    }

}

populate()