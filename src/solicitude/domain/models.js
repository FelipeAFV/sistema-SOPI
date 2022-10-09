
const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db-init");


const Sopi = sequelize.define('sopi', {
    basis: {
        type: DataTypes.STRING,
        field: 'fundamento',
        allowNull: false
    },
    priority: {
        type: DataTypes.BOOLEAN,
        field: 'prioridad'
    },
},
{
    tableName: 'solicitudes'
});


const SopiDetail = sequelize.define('sopiDetail', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    features: {
        type: DataTypes.STRING,
        field: 'caracteristicas'
    },
    quantity: {
        type: DataTypes.INTEGER,
        field: 'cantidad'
    }


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
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
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
    tableName: 'solicitudes_estado', 
    timestamps: false
});
const Supplies = sequelize.define('supply', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    feature: {
        type: DataTypes.STRING,
        field: 'caracteristicas'
    },
    price: {
        type: DataTypes.INTEGER,
        field: 'precio'
    }
},
{
    tableName: 'insumos'
});

const SuppliesCategory = sequelize.define('suppliesCategory', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
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
    Sopi.belongsToMany(SopiStatus, { through: SopiLog});
    Sopi.hasMany(SopiDetail);

    const { User } = require("../../auth/domain/models");
    Sopi.belongsTo(User);
    
}
SopiDetail.loadAssociations = () => {
    SopiDetail.belongsTo(Sopi);
    SopiDetail.belongsTo(Supplies);
    const { PurchaseDetail } = require("../../purchases/domain/models");
    SopiDetail.hasOne(PurchaseDetail)
    
}
SopiLog.loadAssociations = () => {
    // SopiLog.belongsTo(Sopi);
    // SopiLog.belongsTo(SopiStatus);
    const { User } = require("../../auth/domain/models");
    SopiLog.belongsTo(User);
    
}
SopiStatus.loadAssociations = () => {
    SopiStatus.belongsToMany(Sopi, { through: SopiLog});

}
Supplies.loadAssociations = () => {
    Supplies.hasMany(SopiDetail);
    Supplies.belongsTo(SuppliesCategory);
}
SuppliesCategory.loadAssociations = () => {
    SuppliesCategory.hasMany(Supplies);
}
CostCenter.loadAssociations = () => {
    CostCenter.hasMany(Sopi, {
        foreignKey: {
            allowNull: false
        }
    });
}
Financing.loadAssociations = () => {
    Financing.hasMany(Sopi, {
        foreignKey: {
            allowNull: false
        }
    });
}



exports.Sopi = Sopi;
exports.SopiDetail = SopiDetail;
exports.SopiLog = SopiLog;
exports.SopiStatus = SopiStatus;
exports.Supplies = Supplies;
exports.SuppliesCategory = SuppliesCategory;
exports.CostCenter = CostCenter;
exports.Financing = Financing;
