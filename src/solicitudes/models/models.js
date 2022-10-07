
const { sequelize } = require("../../database/db-init");


const Sopi = sequelize.define('sopi', {
    
},
{
    tableName: 'solicitudes'
});


const SopiDetail = sequelize.define('sopiDetail', {
    
},
{
    tableName: 'solicitudes_detalle'
});

const SopiLog = sequelize.define('sopiLog', {
    
},
{
    tableName: 'solicitudes_log'
});
const SopiStatus = sequelize.define('sopiStatus', {
    
},
{
    tableName: 'solicitudes_estado'
});
const Supplies = sequelize.define('supplies', {
    
},
{
    tableName: 'insumos'
});

const SuppliesCategory = sequelize.define('suppliesCategory', {
    
},
{
    tableName: 'categoria'
});
const CostCenter = sequelize.define('costCenter', {
    
},
{
    tableName: 'centro_costo'
});
const Financing = sequelize.define('financing', {
    
},
{
    tableName: 'financiamiento'
});

Sopi.loadAssociations = () => {
    Sopi.belongsTo(CostCenter);
    Sopi.belongsTo(Financing);
    Sopi.hasMany(SopiLog);
    Sopi.hasMany(SopiDetail);

    const { Employee } = require("../../empleados/models/models");
    Sopi.belongsTo(Employee);
    
}
SopiDetail.loadAssociations = () => {
    SopiDetail.belongsTo(Sopi);
    SopiDetail.belongsTo(Supplies);
    const { PurchaseDetail } = require("../../compras/models/models");
    SopiDetail.hasOne(PurchaseDetail)
    
}
SopiLog.loadAssociations = () => {
    SopiLog.belongsTo(Sopi);
    SopiLog.belongsTo(SopiStatus);
    
}
SopiStatus.loadAssociations = () => {
    SopiStatus.hasMany(SopiLog);

}
Supplies.loadAssociations = () => {
    Supplies.hasMany(SopiDetail);
    Supplies.belongsTo(SuppliesCategory);
}
SuppliesCategory.loadAssociations = () => {
    SuppliesCategory.hasMany(Supplies);
}
CostCenter.loadAssociations = () => {
    CostCenter.hasMany(Sopi);
}
Financing.loadAssociations = () => {
    Financing.hasMany(Sopi);
}



exports.Sopi = Sopi;
exports.SopiDetail = SopiDetail;
exports.SopiLog = SopiLog;
exports.SopiStatus = SopiStatus;
exports.Supplies = Supplies;
exports.SuppliesCategory = SuppliesCategory;
exports.CostCenter = CostCenter;
exports.Financing = Financing;
