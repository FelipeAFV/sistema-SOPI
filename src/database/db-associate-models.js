const loadAllAssociations = () => {
    /**
     * When connections is ready, create models
     */
    // const { Workflow, Documento, EstadoWorkflow, Responsable, WorkflowLog } = require('../workflow/models/models');
    const { Usuario, Perfil, Acceso, Permiso } = require('../auth/models/models');
    // const { Detalle, Solicitud } = require('../solicitudes/models/models');
    // const { ResponsableTicket, Ticket } = require('../tickets/models/models');
    // const { CentroCosto, EstadoCompraCC, EstadoLicitacionCC, Financiamiento, ProcesoCompra, TipoCompra } = require('../compras/models/models');

    /**Load associations when all models exists */
    Usuario.loadAssociations();
    Perfil.loadAssociations();
    Acceso.loadAssociations();
    Permiso.loadAssociations();
    // Workflow.loadAssociations();
    // Documento.loadAssociations();
    // EstadoWorkflow.loadAssociations();
    // Responsable.loadAssociations();
    // WorkflowLog.loadAssociations();
    // Detalle.loadAssociations();
    // Solicitud.loadAssociations();
    // Ticket.loadAssociations();
    // ResponsableTicket.loadAssociations();
    // CentroCosto.loadAssociations();
    // EstadoCompraCC.loadAssociations();
    // EstadoLicitacionCC.loadAssociations();
    // Financiamiento.loadAssociations();
    // ProcesoCompra.loadAssociations();
    // TipoCompra.loadAssociations();

    console.log('Cargando asociaciones');
}

exports.loadAllAssociations = loadAllAssociations;

