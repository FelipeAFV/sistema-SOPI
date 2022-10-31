const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/db-init");


const Purchase = sequelize.define('purchase',{
    totalAmmount: {
        type: DataTypes.DOUBLE,
        field: 'costo_total'
    }
}, {
    tableName: 'compras'
});
const PurchaseSopi = sequelize.define('purchaseSopi',{
    sopiId: {
        type: DataTypes.INTEGER,
        field: 'sopi_id',
        allowNull: false,
        validate: {
            notNull: true
        }
    },
    purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'compra_id',
        validate: {
            notNull: true
        }
    }

}, {
    tableName: 'solicitudes_compras'
});

const PurchaseDetail = sequelize.define('purchaseDetail', {
    quantity: {
        type: DataTypes.INTEGER,
        field: 'cantidad'
    },
    price: {
        type: DataTypes.DOUBLE,
        field: 'precio'
    },

}, {
    tableName: 'compras_detalle'
});
const PurchaseLog = sequelize.define('purchaseLog', {

}, {
    tableName: 'compras_log'
});

const PurchaseType = sequelize.define('purchaseType', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    minValue: {
        type: DataTypes.DOUBLE,
        field: 'valor_minimo'
    },
    maxValue: {
        type: DataTypes.DOUBLE,
        field: 'valor_maximo'
    },
}, {
    tableName: 'compras_tipo'
});

const PurchaseStatus = sequelize.define('purchaseStatus', {
    name: {
        type: DataTypes.STRING,
        field: 'nombre'
    }
}, {
    tableName: 'compras_estado',
    timestamps: false
});

const Supplier = sequelize.define('supplier', {
    supplierName: {
        type: DataTypes.STRING,
        field: 'nombre'
    },
    businessName: {
        type: DataTypes.STRING,
        field: 'razon_social'
    },
    address:{
        type: DataTypes.STRING,
        field: 'dirección'
    },
    city: {
        type: DataTypes.STRING,
        field: 'ciudad'
    },
    sector:{
        type: DataTypes.STRING,
        field: 'comuna'
    },
    phone: {
        type: DataTypes.STRING,
        field: 'telefono'
    },
    
}, {
    tableName: 'proveedores'
});


Purchase.loadAssociations = () => {
    Purchase.belongsTo(PurchaseType, { foreignKey: {field: 'tipo_id'}});
    Purchase.belongsTo(Supplier, { foreignKey: { field: 'proveedor_id'}});
    Purchase.belongsToMany(PurchaseStatus, { as: 'purchaseLogStatus', through: PurchaseLog, foreignKey: { field: 'compra_id', name: 'purchaseId'}});
    Purchase.hasMany(PurchaseDetail, { foreignKey: { field: 'compra_id'}});
    Purchase.belongsTo(PurchaseStatus, { as: 'status', foreignKey: { field: 'estado_id'}});
    

    const { Sopi } = require("../../solicitude/domain/models");
    Purchase.belongsToMany(Sopi, { through: PurchaseSopi, foreignKey: { field: 'compra_id', name: 'purchaseId'}});

    const { Document, Manager } = require("../../management/domain/models");
    Purchase.hasMany(Document, { foreignKey: { field: 'compra_id'}});
    Purchase.hasMany(Manager, { foreignKey: {field : 'compra_id'}});

    
}

PurchaseSopi.loadAssociations = () => {

}

PurchaseDetail.loadAssociations = () => {
    PurchaseDetail.belongsTo(Purchase, { foreignKey: { field: 'compra_id'}});

    const { SopiDetail } = require("../../solicitude/domain/models");
    PurchaseDetail.belongsTo(SopiDetail, { foreignKey: {field: 'solicitud_detalle_id'}})
}
PurchaseLog.loadAssociations = () => {

    const { User } = require("../../auth/domain/models");
    PurchaseLog.belongsTo(User, { foreignKey: {field: 'usuario_id'}});
    
}
PurchaseType.loadAssociations = () => {
    PurchaseType.hasMany(Purchase, { foreignKey: {field: 'tipo_id'}})
}
PurchaseStatus.loadAssociations = () => {
    PurchaseStatus.belongsToMany(Purchase, { through: PurchaseLog, foreignKey: {field: 'estado_id', name: 'statusId'}});
    PurchaseStatus.hasMany(Purchase, { foreignKey: {field: 'estado_id'}});
    
}
Supplier.loadAssociations = () => {
    Supplier.hasMany(Purchase, { foreignKey: {field: 'proveedor_id'}})

}


exports.Purchase = Purchase;
exports.PurchaseDetail = PurchaseDetail;
exports.PurchaseLog =PurchaseLog;
exports.PurchaseType =PurchaseType;
exports.PurchaseStatus = PurchaseStatus;
exports.Supplier = Supplier;
exports.PurchaseSopi = PurchaseSopi;