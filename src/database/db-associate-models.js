const loadAllAssociations = () => {
    /**
     * When connections is ready, create models
     */
    // const { Workflow, Documento, EstadoWorkflow, Responsable, WorkflowLog } = require('../workflow/models/models');
    const { User, Permission, Profile, Access, UserAccess } = require('../auth/domain/models');
    const { CostCenter, Financing, Sopi, SopiDetail, SopiLog, SopiStatus, Supplies, SuppliesCategory } = require('../solicitude/domain/models');
    const { Comment, Document, Manager, Ticket, TicketStatus } = require('../management/domain/models');
    const { Department, Employee, Job} = require('../employees/domain/models');
    const { Purchase, PurchaseDetail, PurchaseLog, PurchaseStatus, PurchaseType, Supplier, PurchaseSopi } = require('../purchases/domain/models');

    /**Load associations when all models exists */
    User.loadAssociations();
    Profile.loadAssociations();
    Access.loadAssociations();
    UserAccess.loadAssociations();
    Permission.loadAssociations();
    CostCenter.loadAssociations();
    Financing.loadAssociations();
    Sopi.loadAssociations();
    SopiDetail.loadAssociations();
    SopiLog.loadAssociations();
    SopiStatus.loadAssociations();
    Supplies.loadAssociations();
    SuppliesCategory.loadAssociations();
    TicketStatus.loadAssociations();
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
    PurchaseSopi.loadAssociations();
    Supplier.loadAssociations();
    

    console.log('Cargando asociaciones');
}

exports.loadAllAssociations = loadAllAssociations;

