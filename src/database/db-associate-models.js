const loadAllAssociations = () => {
    /**
     * When connections is ready, create models
     */
    // const { Workflow, Documento, EstadoWorkflow, Responsable, WorkflowLog } = require('../workflow/models/models');
    const { User, Permission, Profile, Access } = require('../auth/models/models');
    const { CostCenter, Financing, Sopi, SopiDetail, SopiLog, SopiStatus, Supplies, SuppliesCategory } = require('../solicitudes/models/models');
    const { Comment, Document, Manager, Ticket } = require('../gestion/models/models');
    const { Department, Employee, Job } = require('../empleados/models/models');
    const { Purchase, PurchaseDetail, PurchaseLog, PurchaseStatus, PurchaseType, Supplier } = require('../compras/models/models');

    /**Load associations when all models exists */
    User.loadAssociations();
    Profile.loadAssociations();
    Access.loadAssociations();
    Permission.loadAssociations();
    CostCenter.loadAssociations();
    Financing.loadAssociations();
    Sopi.loadAssociations();
    SopiDetail.loadAssociations();
    SopiLog.loadAssociations();
    SopiStatus.loadAssociations();
    Supplies.loadAssociations();
    SuppliesCategory.loadAssociations();
    Ticket.loadAssociations();
    Comment.loadAssociations();
    Document.loadAssociations();
    Manager.loadAssociations();
    Department.loadAssociations();
    Job.loadAssociations();
    Employee.loadAssociations();
    Purchase.loadAssociations();
    PurchaseDetail.loadAssociations();
    PurchaseLog.loadAssociations();
    PurchaseType.loadAssociations();
    PurchaseStatus.loadAssociations();
    Supplier.loadAssociations();
    

    console.log('Cargando asociaciones');
}

exports.loadAllAssociations = loadAllAssociations;

