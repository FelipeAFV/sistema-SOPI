const fs = require('fs');
const { saveDocument, findDocument, findDocsWithCondition } = require('../domain/document-repository');
const uuid = require('uuid');
const { findAllPermissionsFromUserAndProfile } = require('../../auth/domain/permission-repository');
const { getTicketsFromUserId, getTicketFromId, getTicketFromPurchase } = require('../domain/ticket-repository');
const { getAllPurchasesWithManager } = require('../../purchases/domain/purchase-repository');
const { PermissionError } = require('../../share/models/errors');
const { findManagerPurchase, findManagersWithConditions } = require('../domain/manager-repository');


const addDocument = async ({file, purchaseId, userId}) => {

    const fileExt = file.originalname.split('.').slice(-1)[0];
    const fileName = uuid.v4()
    const filePath = process.env.STATIC_ROOT + `/${purchaseId}/${fileName}.${fileExt}`

    console.log(fileName)

    /* Create directory for files of purchase order*/
    fs.mkdir(process.env.STATIC_ROOT + '/' + purchaseId, {}, (err) => {console.log(err)});
    fs.writeFileSync(filePath, file.buffer);

    const docStored = await saveDocument({purchaseId, type: fileExt, name: fileName+ '.' + fileExt, path: filePath });

    return docStored;
}

const findDocumentWithPermissions = async (docId, userId, profileId) => {

    const doc = await findDocument(docId)

    const permissions = await findAllPermissionsFromUserAndProfile(userId, profileId);

    const docPermissions = permissions.filter(p => p.name.includes('DOC'));

    if (docPermissions.find(p => p.name == 'DOC_VER')) {
        return doc;
    }

    const docFromPurchaseTicketPermission = docPermissions.find( p => p.name == 'DOC_VER_COMPRA_TICKET');
    const docFromPurchaseManagerPermission = docPermissions.find( p => p.name == 'DOC_VER_COMPRA_GESTOR');

    if (docFromPurchaseTicketPermission) {
        const tickets = await getTicketsFromUserId(userId);
        if (tickets.find(t => t.purchaseId == doc.purchaseId)) {
            return doc
        }
        throw new PermissionError('No tienes los permisos necesarios, el documento debe estar asociado a una compra' +
        ' en la que tengas tickets asociados', docFromPurchaseTicketPermission.name);
        
    } else if (docFromPurchaseManagerPermission) {
        const purchasesManage = await  getAllPurchasesWithManager(userId);
        if (purchasesManage.find( p => p.id == doc.purchaseId)) {
            return doc
        }
        throw new PermissionError('No tienes los permisos necesarios, el documento debe estar asociado a una compra' +
        ' en la que seas gestor', docFromPurchaseManagerPermission.name);
        
        
    }
    
    throw new PermissionError('No tienes ningun permiso para poder ver documentos');
    
}

const findDocsFromCompraWithPermissions = async (purchaseId, userId, profileId) => {

    
    const docs = await findDocsWithCondition({purchaseId});
    
    const permissions = await findAllPermissionsFromUserAndProfile(userId, profileId);
    const docPermissions = permissions.filter(p => p.name.includes('DOC'))
    
    if (docPermissions.find(p => p.name == 'DOC_VER')) {
        return docs;
    }

    // Puede ver si tiene tickets asociados a la compra
    const ticketFromCompra = await getTicketFromPurchase(purchaseId);

    if (ticketFromCompra.find( t => t.userId == userId)) {
        return docs;
    }
    // Puede ver si es gestor de la compra
    
    const purchaseManagers = await findManagersWithConditions({ purchaseId: purchaseId});
    if (purchaseManagers.find( m => m.userId == userId)) {
        
        return docs;
    }
    
    throw new PermissionError('No tienes ningun permiso para poder ver documentos');
}

exports.addDocument = addDocument;
exports.findDocumentWithPermissions = findDocumentWithPermissions;
exports.findDocsFromCompraWithPermissions = findDocsFromCompraWithPermissions;