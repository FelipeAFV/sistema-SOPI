const { sequelize } = require("../../database/db-init");


const ProcesoCompra = sequelize.define('procesoCompra',{

}, {
    tableName: 'procesos_compra'
});

const Financiamiento = sequelize.define('financiamiento', {

}, {
    tableName: 'financiamientos'
});

const TipoCompra = sequelize.define('tipoCompra', {

}, {
    tableName: 'tipos_compra'
});
const EstadoCompraCC = sequelize.define('estadoCompraCC', {

}, {
    tableName: 'estados_compra_cc'
});
const EstadoLicitacionCC = sequelize.define('estadoLicitacionCC', {

}, {
    tableName: 'estados_licitación_cc'
});
const CentroCosto = sequelize.define('tipoCompra', {

}, {
    tableName: 'centros_costo'
});

ProcesoCompra.loadAssociations = () => {
    ProcesoCompra.belongsTo(EstadoCompraCC);
    ProcesoCompra.belongsTo(EstadoLicitacionCC);
    ProcesoCompra.belongsTo(CentroCosto);
    ProcesoCompra.belongsTo(TipoCompra);
    ProcesoCompra.belongsTo(Financiamiento);

    const { Detalle } = require("../../solicitudes/models/models");
    ProcesoCompra.hasMany(Detalle);
    const { Workflow } = require("../../workflow/models/models");
    ProcesoCompra.belongsTo(Workflow);
    
}
Financiamiento.loadAssociations = () => {
    Financiamiento.hasMany(ProcesoCompra);
}
TipoCompra.loadAssociations = () => {
    TipoCompra.hasMany(ProcesoCompra);
    
}
EstadoCompraCC.loadAssociations = () => {
    EstadoCompraCC.hasMany(ProcesoCompra);
    
}
EstadoLicitacionCC.loadAssociations = () => {
    EstadoLicitacionCC.hasMany(ProcesoCompra);
    
}
CentroCosto.loadAssociations = () => {
    CentroCosto.hasMany(ProcesoCompra);

}


exports.ProcesoCompra = ProcesoCompra;
exports.TipoCompra = TipoCompra;
exports.EstadoCompraCC =EstadoCompraCC;
exports.EstadoLicitacionCC =EstadoLicitacionCC;
exports.CentroCosto = CentroCosto;
exports.Financiamiento = Financiamiento;