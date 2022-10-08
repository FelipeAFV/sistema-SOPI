
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db-init");


const Sopi = sequelize.define('sopi', {
    
},
{
    tableName: 'solicitudes'
});


const SopiDetail = sequelize.define('sopiDetail', {
    sopiName: {
        type: DataTypes.STRING,
        field: 'nombre_sopi'
    },
    priority: {
        type: DataTypes.BOOLEAN,
        field: 'prioridad'
    },
    reason: {
        type: DataTypes.STRING,
        field: 'fundamento'
    },
    features: {
        type: DataTypes.STRING,
        field: 'caracteristicas'
    },
    deliveryDate: {
        type: DataTypes.DATE,
        field: 'fecha_entrega'
    },


},
{
    tableName: 'solicitudes_detalle'
});

const SopiLog = sequelize.define('sopiLog', {
    updateDate: {
        type: DataTypes.DATE,
        field: 'fecha_actualización'
    }
},
{
    tableName: 'solicitudes_log'
});
const SopiStatus = sequelize.define('sopiStatus', {
    statusName: {
        type: DataTypes.STRING,
        field: 'nombre_estado'
    },
    cod: {
        type: DataTypes.STRING,
        field: 'código'
    },
    level: {
        type: DataTypes.INTEGER,
        field: 'nivel_completitud'
    }
},
{
    tableName: 'solicitudes_estado'
});
const Supplies = sequelize.define('supplies', {
    supplyName: {
        type: DataTypes.STRING,
        field: 'nombre_insumo'
    },
    feature: {
        type: DataTypes.STRING,
        field: 'caracteristicas'
    },
    supplyPrice: {
        type: DataTypes.NUMBER,
        field: 'precio_insumo'
    }
},
{
    tableName: 'insumos'
});

const SuppliesCategory = sequelize.define('suppliesCategory', {
    categoryName: {
        type: DataTypes.STRING,
        field: 'nombre_categoria'
    }
},
{
    tableName: 'categorias'
});
const CostCenter = sequelize.define('costCenter', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    
},
{
    tableName: 'centros_costo',
    timestamps: false
});
const Financing = sequelize.define('financing', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    }
    
},
{
    tableName: 'financiamientos',
    timestamps: false
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
