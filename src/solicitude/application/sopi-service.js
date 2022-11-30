const { findAllPermisionFromProfileId, findAllPermissionsFromUserAndProfile } = require("../../auth/domain/permission-repository");
const { sequelize } = require("../../database/db-init");
const { getAllPurchasesWithManager } = require("../../purchases/domain/purchase-repository");
const { pagination } = require("../../share/utils/api-feature");
const { SopiLog, Sopi } = require("../domain/models");
const { saveSopi, updateSopi, findSopi, getAllSopis, getAllSopisByConditions, getSopiById, getAllSopisByStatus } = require("../domain/sopi-repository");
const { saveSopiDetail, getSopiDetailsById } = require("../domain/sopidetail-repository");
const { addLogEntryByStatusName, addLogEntryByStatusId } = require("../domain/sopilog-repository");
const { findStatusByName } = require("../domain/sopistatus-repository");


const generateSopiDetails = async (items, sopiId) => {


    const sopiDetails = [];
    console.log(items)
    for (let item of items) {

        if (item.supplyId) {
            console.log('Añadiendo item')
            const sopiDetailCreated = await saveSopiDetail({ supplyId: item.supplyId, quantity: item.quantity, sopiId })
            sopiDetails.push(sopiDetailCreated);
            continue;
        }
        const { name, features, quantity } = item;

        if (!name || !features || !quantity) {
            throw new Error(`Datos faltantes para item ${JSON.stringify(item)}`);
        }
        const sopiDetailCreated = await saveSopiDetail({ name, features, quantity, sopiId });
        sopiDetails.push(sopiDetailCreated);
    }

    return sopiDetails;



}


const createSopiSeqTransactional = async ({ costCenterId, financingId, basis, userId, items }) => {

    try {
        console.log(items.length)
        if (!items || items.length == 0) {
            throw new Error('La sopi debe ser ingresada con detalles')
        }
        const response = await sequelize.transaction(async (t) => {

            const status = await findStatusByName('INGRESADA');

            let sopiCreated = await saveSopi({ costCenterId, financingId, basis: '', userId, statusId: status.id })
                .catch(e => { console.log(e); throw new Error('Centro de costo o financiamiento no existe') });

            sopiCreated = await updateSopi(sopiCreated.id, { basis: basis || null })
                .catch(e => { throw new Error('Fundamento debe existir') });

            await addLogEntryByStatusName(sopiCreated.id, userId, 'INGRESADA');
            console.log('A añadir entrada de logs')

            const details = await generateSopiDetails(items, sopiCreated.id);

            // for (let detail of details) {

            //     await sopiCreated.setSopiDetails(detail);
            // }


            return sopiCreated;
        });
        return response;

    } catch (e) {
        console.log(e)
        throw new Error(e.message);
    }

}


const updateSopiStatus = async ({ sopiId, statusId, userId, comment }) => {

    const sopiUpdated = await updateSopi(sopiId, { statusId: statusId });

    await addLogEntryByStatusId(sopiId, userId, comment, statusId);

    return sopiUpdated;
};

const updateSopiWithStatus = async ({sopiId, statusId, technicalSpecification, userId, comment}) => {

    const sopiUpdated = await updateSopi(sopiId, {statusId: statusId, userId:userId, technicalSpecification:technicalSpecification});

    await addLogEntryByStatusId(sopiId, userId, comment,statusId);

    return sopiUpdated;

}

const getSopiByIdWithDetails = async(sopiId) => {
    const sopi = await getSopiById(sopiId);
/*     console.log(sopi.sopiStatusId) */
    /* const status = await sopi.getSopiLogStatus(); */
/*     sopi.status = status.map((status)=>status.name); */
    const details = await getSopiDetailsById(sopiId);
    const sopiWithDetails = {
        sopi: sopi,
        details: details 
    }
    return sopiWithDetails;
}


const getSopisFilteredByUserPermissions = async (profileId, userId) => {

    const access = await findAllPermissionsFromUserAndProfile(userId, profileId);
    let sopis = [];

    // Tiene permiso para ver todo
    if (access.find(a => a.name == 'SOPI_VER')) {
        sopis = await getAllSopis();
        return sopis;
    }
    
    //TODO: Chequear permiso de creador 'SOPI_VER_CREADOR'
    
    const ownerAccess = access.find(a => a.name == 'SOPI_VER_CREADOR');
    const managerAccess = access.find(a => a.name == 'SOPI_VER_COMPRA_GESTOR');
    if (ownerAccess && !managerAccess) {
        sopis = await getAllSopisByConditions({userId: userId})
    }
    
    //TODO: Chequear permiso de gestor 'SOPI_VER_COMPRA_GESTOR
    else if (!ownerAccess && managerAccess) {
        sopis = await getAllPurchasesWithManager(userId);
    } else if (ownerAccess && managerAccess) {
        
        ownerSopis = await getAllSopisByConditions({userId: userId})
        managerSopis = await getAllPurchasesWithManager(userId);
        sopis = [...ownerSopis, ...managerSopis];
    } else {
        sopis = await getAllSopis();

    }

    const sopiStatusAccess = access.filter((access) => access.name.includes('SOPI_VER_ESTADO'));


    const sopisFiltered = sopis.filter(sopi => {
        let permitted = false;

        for (let access of sopiStatusAccess) {
            if (access.name.includes(sopi.status.name)) {
                permitted = true;
                break;
            }

        }
        return permitted;
    });
    return sopisFiltered;
}

const getSopisFilteredByUserPermissions2 = async (query, profileId, userId) => {

    const access = await findAllPermissionsFromUserAndProfile(userId, profileId);
    const page = query.page ? Number.parseInt(query.page) : 1;
    const perPage = query.per_page ? Number.parseInt(query.per_page) : 20;
    let sopis = [];

    // Tiene permiso para ver todo
    if (access.find(a => a.name == 'SOPI_VER')) {
        sopis = await getAllSopis(page, perPage);
        // TODO: PAginacion
        return pagination({
            data:sopis,
            count: sopis.length,
            page,
            perPage
        });
    }
    
    if(access.find(a=> a.name == 'SOPI_EDITAR_ESTADO_REVISADO_REFERENTE')) {
        
        sopis = await getAllSopisByStatus({name:'REVISION_REFERENTE'}, page, perPage);
        
        return pagination({
            data: sopis,
            count: sopis.length,
            page,
            perPage
        });
    }
    //TODO: Buscar sopis que el user haya creado
    
    const createdSopis = await getAllSopisByConditions({userId}, page,perPage );

    return pagination({
        data:createdSopis,
        count: createdSopis.length,
        page,
        perPage
    });
   
}

exports.createSopi = createSopiSeqTransactional;
exports.updateSopiStatus = updateSopiStatus;
exports.getSopiByIdWithDetails = getSopiByIdWithDetails;
exports.getSopisFilteredByUserPermissions = getSopisFilteredByUserPermissions2;
exports.updateSopiWithStatus = updateSopiWithStatus;