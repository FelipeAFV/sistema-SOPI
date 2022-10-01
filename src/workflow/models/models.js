const { DataTypes } = require("sequelize");


const { sequelize } = require("../../database/db-init");


const Documento = sequelize.define('documento', {
    nombre : {
        type: DataTypes.STRING
    },
    tipo: {
        type: DataTypes.STRING
    },
    ruta: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'documentos'
});

const EstadoWorkflow = sequelize.define('estadoWorkflow',{

}, {
    tableName: 'estados_workflow'
});

const WorkflowLog = sequelize.define('workflowLog', {

}, {
    tableName: 'workflow_logs'
});

const Workflow = sequelize.define('workflow', {

}, {
    tableName: 'workflows'
});

const Responsable = sequelize.define('responsables', {

}, {
    tableName: 'responsables'
});

Documento.loadAssociations = () => {
    Documento.belongsTo(Workflow);

}
EstadoWorkflow.loadAssociations = () => {

    EstadoWorkflow.hasMany(Workflow);
    EstadoWorkflow.hasOne(EstadoWorkflow, {as: 'estadoAnterior'})
    EstadoWorkflow.hasOne(EstadoWorkflow, {as: 'estadoNuevo'})

}
WorkflowLog.loadAssociations = () => {

    WorkflowLog.belongsTo(EstadoWorkflow);
    WorkflowLog.belongsTo(Workflow);

}
Responsable.loadAssociations = () => {

}

Workflow.loadAssociations = () => {

    const { Perfil } = require("../../auth/models/models");
    Workflow.belongsToMany(Perfil, { through: Responsable});

    const { ProcesoCompra } = require("../../compras/models/models");
    Workflow.hasOne(ProcesoCompra);
    
    Workflow.hasMany(Documento);

    const { Ticket } = require("../../tickets/models/models");
    Workflow.hasMany(Ticket);

    Workflow.belongsTo(EstadoWorkflow);

    Workflow.hasMany(WorkflowLog);

}




exports.Workflow = Workflow;
exports.Responsable = Responsable;
exports.Documento = Documento;
exports.EstadoWorkflow = EstadoWorkflow;
exports.WorkflowLog = WorkflowLog;